
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchArticles } from '../api/articleApi.js';


// 게시글 목록 조회

function ArticleList () {
    
    // state
    const [articles, setArticles] = useState(null);  
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    
    useEffect(() => {
        
        fetchArticles()
            .then(data => {
                console.log('data : ', data);                
                setArticles(data);
            } ) 
            .catch(error => {
                console.error('error : ', error);
                setError('게시글을 불러오는 데 실패했습니다.');                
            })
            .finally(() => {
                setLoading(false);
            })

    }, []);
    

    if (loading) {
        return (<h2>Loading...</h2>);
    }

    
    if (error) {
        return (<h2>{error}</h2>);
    }

    return (
        <>
            <table border="1" cellPadding="8" cellSpacing="0" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>제목</th>
                        <th>작성자</th>
                        <th>작성일</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        articles.map((article, i) => (
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td style={{ cursor: 'pointer', color: 'gray', textDecoration: 'underline' }}
                                    onClick={() => navigate(`/view/${article.id}`)}>
                                    {article.title}
                                </td>
                                <td>{article.writer}</td>
                                <td>{article.reg_date}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </>
    );

}


export default ArticleList;