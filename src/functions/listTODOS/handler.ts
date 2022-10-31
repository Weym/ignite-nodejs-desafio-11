import { middyfy } from '@libs/lambda';
import { APIGatewayProxyHandler } from "aws-lambda";
import { document } from "../utils/dynamodbClient";

const listTODOS: APIGatewayProxyHandler = async (event) => {
    const { user_id } = event.pathParameters;

    const response = await document
        .scan({
            TableName: 'todos',
            FilterExpression: ':user_id = user_id',
            ExpressionAttributeValues: {
                ':user_id': user_id,
            },
        })
        .promise();

    const userTODOS = response.Items

    if (userTODOS) {
        return {
            statusCode: 200,
            body: JSON.stringify({ userTODOS })
        }
    };

    return {
        statusCode: 404,
        body: JSON.stringify({
            message: "This user has not created a single TODO",
        })
    };
}

export const main = middyfy(listTODOS);