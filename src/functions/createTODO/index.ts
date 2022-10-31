import { handlerPath } from '@libs/handler-resolver';

export default {
    handler: `${handlerPath(__dirname)}/handler.main`,
    events: [
        {
            http: {
                path: '/todos/{user_id}',
                method: 'post',
                cors: true,
            }
        },
    ],
};
