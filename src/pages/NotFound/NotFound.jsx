import React                from 'react';
import { Button, Result }   from 'antd';

export const NotFound = () => {
    return (
        <Result
            status      =   "404"
            title       =   "404"
            subTitle    =   "Sorry, the page you visited does not exist."
            extra       =   {<Button type="primary" href='/package-list'>Back Home</Button>}
        />
    )
}