
// 미들웨어 등록
export const jsonParser = (req, res, next) => {

    let data = '';

    req.on('data', chunk => {
        data += chunk;
    });


    req.on('end', () => {
        try {
            req.body = JSON.parse(data);
        } catch (error) {
            req.body = {};            
        }            
        next();
    });



}