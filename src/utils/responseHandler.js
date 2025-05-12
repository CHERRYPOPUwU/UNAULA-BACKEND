/**
 * Successful response template with proper formatting.
 * 
 * @function successResponse
 * @param {Object} res - The HTTP response object.
 * @param {Object} data - The data to be included in the response (optional).
 * @param {string} [message=‘Success’] - The message to be sent in the response (default “Success”).
 * @param {number} [status=200] - The HTTP status code to return (default 200).
 * @returns {Object} HTTP response with the specified status code, message and data (if any).
 */

export function successResponse(res, data, message = 'Success', status = 200) {

    const response = {
        message
    };

    if(data) response.data = data;

    return res.status(status).json(response);
}