import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchArticle, deleteArticle } from "../api/articleApi";
import ResultModal from "../common/ResultModal";

function ArticleView () {
    
    // url parameter
    const { id } = useParams(); // {id: 1}
    console.log('article id : ', id);

    // state
    const [ article, setArticle ] = useState(null);
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(null);
    const [ result, setResult ] = useState(null);

    // 페이지 이동
    const navigate = useNavigate();


    useEffect(() => {
        fetchArticle(id)
            .then((data) => {
                setArticle(data);                
            })
            .catch((error) => {
                console.log('error : ', error);
                setError('게시글 상세 정보를 불러오는 데 실패했습니다.');
            })
            .finally(() => {
                setLoading(false);
            })

    }, [id]);

    if (loading) {
        return (<h2>Loading...</h2>);
    }


    if (error) {
        return (<h2>{error}</h2>);
    }

    // event listener (게시글 삭제)
    const handleRemove = () => {
        
        deleteArticle(id)
            .then(data => {
                console.log('data : ', data);  // {msg: 'Article deleted successfully'}  
                navigate('/list');
            })
            .catch(error => {
                setError(error);
            })
            .finally(() => {
                setLoading(false);
            })

    }

    // event listener (게시글 수정폼)
    const handleModify = () => {
        navigate(`/modify/${id}`);
    }

    // event listener (게시글 목록조회)
    const handleList = () => {
        navigate(`/list`);
    }


    
    return (
        <>
            <h2>개시글 상세조회</h2>
            <div>
                <h3>{article.title}</h3>
                <div>
                    <p>작성자: {article.writer}</p>
                    <p>작성일: {article.reg_date}</p>
                </div>
                <p>{article.contents}</p>
            </div>
            
            <div>
                <button style={{color: 'black', marginRight: '20px', fontWeight: 'bold'}} onClick={handleModify}>Modify</button>
                <button style={{color: 'black', marginRight: '20px', fontWeight: 'bold'}} onClick={handleRemove}>Delete</button>
                <button style={{color: 'black', marginRight: '20px', fontWeight: 'bold'}} onClick={handleList}>List</button>                
            </div>

            { result ? <ResultModal title='게시글' content={result} callbackFunc={closeModal}/> : <></> }
        </>
    );
}


export default ArticleView;
