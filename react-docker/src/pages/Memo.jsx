import React from 'react'
import { Box } from '@mui/system';
import { IconButton, TextField } from '@mui/material';
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import memoApi from '../api/memoApi';
import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setMemo } from '../redux/features/memoSlice';
import EmojiPicker from '../components/common/EmojiPicker';

const Memo = () => {
const {memoId} =useParams();
const [title, setTitle] = useState("");
const [description, setDescription] = useState("");
const [icon, setIcon] = useState("");
const memos = useSelector((state) => state.memo.value);
const dispatch = useDispatch();
const navigate = useNavigate();

  useEffect(() => {
    const getMemo = async () => {
      try {
        const res = await memoApi.getOne(memoId);
        // console.log(res.title);
        setTitle(res.title);
        setDescription(res.description);
        setIcon(res.icon);
      } catch (err) {
        alert(err);
      }
    }
    getMemo();
  }, [memoId]);

  let timer;
  // 500ms(0.5s)
  const timeout = 500;

  // e（イベント）を受け取らないと文字情報を受け取れない
  const updateTitle = async (e) => {
    // 0.5s経てば更新、それまでに文字打たれたら時間をリセット
    clearTimeout(timer);
    const newTitle = e.target.value;
    setTitle(newTitle);

    timer = setTimeout(async () => {
      try {
        await memoApi.update(memoId, {title: newTitle});
      } catch (err) {
        alert(err);
      }
    }, timeout);
  };

  const updateDescription = async (e) => {
    // 0.5s経てば更新、それまでに文字打たれたら時間をリセット
    clearTimeout(timer);
    const newDescription = e.target.value;
    setDescription(newDescription);

    timer = setTimeout(async () => {
      try {
        await memoApi.update(memoId, {description: newDescription});
      } catch (err) {
        alert(err);
      }
    }, timeout);
  };

  const deleteMemo = async () => {
    try {
      const deletedMemo = await memoApi.delete(memoId);
      console.log(deletedMemo);
      // 選択したmemoIdを取り除いた配列がnewMemosに入る
      const newMemos = memos.filter((e) => e._id !== memoId);
      if(newMemos.length === 0) {
        navigate("/memo");
      } else {
        navigate(`/memo/${newMemos[0]._id}`);
      }
      dispatch(setMemo(newMemos));
    } catch (err) {
      alert(err);
    }
  }

  const onIconChange = async(newIcon) => {
    // memosの中身を直接変更したくないため避難
    let temp = [...memos];
    const index = temp.findIndex((e) => e._id === memoId);
    temp[index] = {...temp[index], icon: newIcon};
    setIcon(newIcon);
    dispatch(setMemo(temp));
    try {
      await memoApi.update(memoId, {icon: newIcon});
    } catch (err) {
      alert(err);
    }
  };

  return (
    <>
      <Box 
        sx={{
          display: "flex", 
          alignItems: "center", 
          // justifyContent: "space-between", 
          width: "100%",
        }}
      >
        <IconButton>
          <StarBorderOutlinedIcon />
        </IconButton>
        <IconButton 
          variant="outlined" 
          color="error"
          onClick={deleteMemo}
        >
          <DeleteOutlinedIcon />
        </IconButton>
      </Box>
      <Box sx={{padding: "10px 50px"}}>
        <Box>
          <EmojiPicker icon={icon} onChange={onIconChange} />
          <TextField 
            onChange={updateTitle}
            value={title}
            placeholder="無題" 
            variant="outlined" 
            fullWidth 
            sx={{
              // 開発者ツールの要素タブでフォーカスした時のclassがMuiOutlinedInput-input
              ".MuiOutlinedInput-input": {padding: 0},
              ".MuiOutlinedInput-notchedOutline": {border: "none"},
              ".MuiOutlinedInput-root": {fontSize: "2rem", fontWeight: "700"},
            }} 
          />
          <TextField 
            onChange={updateDescription}
            value={description}
            placeholder="追加" 
            variant="outlined" 
            fullWidth 
            sx={{
              ".MuiOutlinedInput-input": {padding: 0},
              ".MuiOutlinedInput-notchedOutline": {border: "none"},
              ".MuiOutlinedInput-root": {fontSize: "1rem"},
            }}
          />
        </Box>
      </Box>
    </>
  )
}

export default Memo;