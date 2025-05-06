  import jwt from 'jsonwebtoken'


  const generateToken = (res, userId) => {
    const token = jwt.sign({userId}, process.env.JTW_SECRET,{
        expiresIn:"30d",
    });

    //set JWT as an HTTP-only Cookie

    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development', //ajouter le signe diférent avec trois traits horizontales 
        sameSite : 'strict',
        maxAge : 30 * 24 * 60 * 60 * 1000
    });

    return token
  };


  export default generateToken;