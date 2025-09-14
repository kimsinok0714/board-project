
import axios from 'axios';

export const API_SERVER_HOST = 'http://localhost:5000';

const prefix = `${API_SERVER_HOST}/api`;


// 게시글 목록조회 요청
export const fetchArticles = async () => {     

    const res = await axios.get(`${prefix}/articles`);
    console.log('res.data : ', res.data);    // Array 객체    
    
    return res.data;   // Promise 객체

}

// 게시글 상세조회 요청
export const fetchArticle = async (id) => {
    
    console.log('id : ', id);    

    const res = await axios.get(`${prefix}/articles/${id}`);
    console.log('res.data : ', res.data[0]);

    return res.data[0];

}


// 게시글 삭제 요청
export const deleteArticle = async (id) => {

    console.log('삭제하고자하는 게시글 번호 : ', id);

    const res = await axios.delete(`${prefix}/articles/${id}`);

    return res.data;

}


// 게시글 수정 요청
export const modifyArticle = async (article) => {

    const res = await axios.put(`${prefix}/articles/${article.id}`, article);

    return res.data;

}


// 게시글 등록 요청
export const addArticle = async (article) => {
    
    const result = await axios.post(`${prefix}/articles`, article);  // 자바스크림트 객체 -> JSON 문자열 변환(axios 지원)

    return result.data;
}



