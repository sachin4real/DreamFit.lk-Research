

export const test = (req,res)=>{
    res.json({message: 'API is working'});
};


export const signOutUser = async (req, res, next) => {

    try {
        res.clearCookie('access_token').status(200).json('User han been sign out')
    } catch (error) {
        next(error)
    }

}
