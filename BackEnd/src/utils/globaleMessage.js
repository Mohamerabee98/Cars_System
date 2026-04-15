export const resMsg = (res, status, msg, data) => {
    return res
        .status(status)
        .json({
            success: true,
            message: msg,
            data,
        })
}