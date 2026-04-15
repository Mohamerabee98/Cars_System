export const errorHandel = (err, req, res, next) => {
    return res.
    status(err.cause || 500)
    .json({
        success:false,
        message:err.message || 'Internal Server Error'
    })
}