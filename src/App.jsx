import { Link, Routes, Route } from 'react-router-dom';
import './App.css'
import ArticleList from './components/ArticleList';
import ArticleView from './components/ArticleView';
import ArticleWrite from './components/ArticleWrite';
import ArticleModify from './components/ArticleModify';

function App() {  
  
  return (
    <>
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <Link to="/write" style={{ textDecoration: 'none', color: '#fff', background: '#007bff', padding: '8px 16px', borderRadius: '4px' }}>
          게시글 등록
        </Link>
        <Link to="/list" style={{ textDecoration: 'none', color: '#fff', background: '#28a745', padding: '8px 16px', borderRadius: '4px' }}>
          게시글 목록조회
        </Link>
      </div>

      <Routes>
        <Route path='/' element={<ArticleList />} />
        <Route path='/list' element={<ArticleList />} />
        <Route path='/write' element={<ArticleWrite />} />
        <Route path='/view/:id' element={<ArticleView />} />
        <Route path='/modify/:id' element={<ArticleModify />} />      
      </Routes>
    </>
  );

}

export default App;
