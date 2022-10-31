import { middyfy } from '@libs/lambda';
import { document } from "../utils/dynamodbClient";
import { v4 as uuid } from 'uuid';

interface ICreateTODO {
    title: string;
    deadline: string;
}

interface ITodo {
    id: string;
    user_id: string;
    title: string;
    done: boolean;
    deadline: string;
}

const createTODO = async (event) => {
    const { user_id } = event.pathParameters;
    let { title, deadline } = event.body as ICreateTODO;

    const data: ITodo = {
        id: uuid(),
        user_id,
        title,
        done: false,
        deadline: new Date(deadline).toISOString(),
    }

    await document.put({
        TableName: "todos",
        Item: data
    }).promise();

    return {
        statusCode: 201,
        body: JSON.stringify({
            message: "TODO created",
            data
        }),
        headers: {
            "Content-type": "application/json",
        },
    };
};

export const main = middyfy(createTODO);