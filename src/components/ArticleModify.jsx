    import { useEffect, useState } from "react";
    import { useNavigate, useParams } from "react-router-dom";
    import { fetchArticle, modifyArticle, deleteArticle } from '../api/articleApi.js';
    import ResultModal from "../common/ResultModal.jsx";


    const initialArticle = {
        title: '',
        contents: '',
        writer: ''
    }


    function ArticleModify () {

        // url parameter
        const { id } = useParams();  // {id : 1}  

        // state
        const [ article, setArticle ] = useState({...initialArticle});
        const [ loading, setLoading ] = useState(true);
        const [ error, setError ] = useState(null);
        const [ result, setResult ] = useState(null);
        const [actionType, setActionType] = useState(null);  // 수정, 삭제 버튼 선택 상태

        // 페이지 이동
        const navigate = useNavigate();


        useEffect(() => {
            fetchArticle(id)
                .then((data) => {
                    setArticle(data);
                })
                .catch((error) => {
                    setError(error);
                })
                .finally(() => {    
                    setLoading(false);
                })            

        }, [id]);


        const handleChangeForm = (e) => {

            setArticle({
                ...article ,
                [e.target.name]: e.target.value 
            }); 

        }

        const handleClickModify = () => {

            const { title, writer, contents } = article;
            
            if (title.trim() === '') {
                alert('제목을 입력하세요');
            } else if (writer.trim() === '') {
                alert('작성자를 입력하세요');
            } else if (contents.trim() === '') {
                alert('내용을 입력하세요');
            } else {
                if (window.confirm('정말로 게시글을 수정하시겠습니까?')) {

                    setLoading(true);

                    modifyArticle(article)
                        .then((data) => {
                            console.log('data : ', data);         
                            setActionType('Modified');                   
                            setResult('게시글이 수정되었습니다.');
                        })
                        .catch((error) => {
                            setError('게시글 수정하는데 실패했습니다.');
                        })
                        .finally(() => {
                            setLoading(false);
                        })
                }
            }
        }


        const handleClickDelete = () => {   
            if (window.confirm('정말로 게시글을 삭제하시겠습니까?')) {

                setLoading(true);

                deleteArticle(id)
                    .then(data => {
                        setActionType('Deleted');
                        setResult('게시글이 삭제되었습니다.');
                    })
                    .catch(error => {
                        setError('게시글 수정하는데 실패했습니다.');
                    })
                    .finally(() => {
                        setLoading(false);
                    });
            }
        }

        const closeModal = () => {
            if (actionType === 'Modified') {
                navigate(`/view/${id}`);
            } else {  // Deleted
                navigate(`/list`);
            }            
        }


        return (
            <>
                <div className="form-container">

                    <h1 className="form-title">게시글 수정</h1>

                    <div style={{ marginBottom: "16px" }}></div> {/* 여백 추가 */}

                    <div className="form-group-horizontal">
                        <label htmlFor="title">제목</label>
                        <input
                            type="text"
                            name="title"
                            value={article.title}                       
                            onChange={handleChangeForm}
                        />
                    </div>
                    <div className="form-group-horizontal">
                        <label htmlFor="writer">작성자</label>
                        <input
                            type="text"
                            name="writer"     
                            value={article.writer}                   
                            onChange={handleChangeForm}
                        />
                    </div>
                    <div className="form-group-horizontal">
                        <label htmlFor="contents">내용</label>
                        <textarea
                            name="contents"                        
                            value={article.contents}
                            onChange={handleChangeForm}
                        ></textarea>
                    </div>
                    <div className="form-actions">
                        <button type="button" onClick={handleClickModify}>Modify</button>
                        <button type="button" onClick={handleClickDelete}>Delete</button>
                    </div>     
                </div>     

                { result ? <ResultModal title='게시글'  content={result} callbackFunc={closeModal} /> : <></> }      
            </>
        );
    }


    export default ArticleModify;