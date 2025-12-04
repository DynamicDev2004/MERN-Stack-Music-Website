export default class SuccessApiResponse{
    constructor(
        statuscode,
        data = {},
        message = 'success'

    ){
        this.statuscode = statuscode,
        this.message = message,
        this.data = data
    }
}