import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addArticle } from "../api/articleApi";

const initialArticle = {
    id: 0 ,
    title: '' ,
    writer: '' ,
    contents: ''
};


function ArticleWrite () {

    // state
    const [ article, setArtile ] = useState({...initialArticle});
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(null);

    // 페이지 이동
    const navigate = useNavigate();



    // event listener
    const handleChangeForm = (e) => {

        setArtile({
            ...article ,
            [e.target.name]: e.target.value
        });

    }

    const handleSubmit = () => {

        const { title, writer, contents } = article;
        if (title.trim() === '') {
            alert('제목을 입력하세요'); 
        }  else if (writer.trim() === '') {
            alert('작성자를 입력하세요'); 
        } else if (contents.trim() === '') {
            alert('내용을 입력하세요'); 
        } else {
            if (window.confirm('게시글을 등록하시겠습니까?')) {

                addArticle(article)
                    .then(data => {
                        console.log('data : ', data);                        
                        navigate('/list');                        
                    })
                    .catch(error => {
                        setError('게시글을 등록하는데 실패했습니다.');
                    })
                    .finally(() => {
                        setLoading(false);
                    });
            }
        }

    }

    const handleReset = () => {
        setArtile(initialArticle);
    }

    return (
            <>
                <div className="form-container">

                    <h1 className="form-title">게시글 등록</h1>

                    <div style={{ marginBottom: "16px" }}></div> 

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
                        <button type="button" onClick={handleSubmit}>Sumbit</button>
                        <button type="button" onClick={handleReset}>Reset</button>
                    </div>     
                </div>     
                
            </>
    );
    

}


export default ArticleWrite;