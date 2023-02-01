import React from 'react'
import { useState } from 'react';

import { Button, Select, Space } from 'antd';
import { AppContext } from '../context/appContext';
import { useContext } from 'react';
import { toast } from 'react-hot-toast';

const CreateGoals = () => {

    const { userToken, cookie, getCookie, setHeartedTags, keywords, heartedTags } = useContext(AppContext);


    const [isLoading, setIsLoading] = useState(false);
    const [values, setValues] = useState([]);




    const handleSubmit = () => {
        setIsLoading(true);
        var data = { user_id: userToken, values: values };
        fetch(`https://discounts-space.com/public/api/web/goals`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => res.json()).then(json => {
            setIsLoading(false);
            if (json.success) {
                toast.success("Goals Added Successfully!");
                fetch(`https://discounts-space.com/public/api/web/getgoals`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ user_token: userToken })
                })
                    .then((response) => response.json())
                    .then((actualData) => { setHeartedTags(JSON.parse(actualData[0].keywords)); })
            }
        }).catch(err => {
            toast.error("Something went wrong!");
            setIsLoading(false);
        })

    }
    console.log(heartedTags);
    return (
        <>
            <div className="row px-3">
                <div className="col-12 px-0" style={{ 'marginTop': '106px' }}>
                    {heartedTags.length != 0

                        ?

                        <Select
                            mode="tags"
                            allowClear
                            style={{ width: '100%' }}
                            placeholder="Please select"
                            defaultValue={heartedTags}
                            onChange={(e) => setValues(e)}
                            options={keywords ? keywords : []}
                        />


                        :


                        <Select
                            mode="tags"
                            allowClear
                            style={{ width: '100%' }}
                            placeholder="Please select"
                            defaultValue={[]}
                            onChange={(e) => setValues(e)}
                            options={keywords ? keywords : []}
                        />



                    }


                    <div class="btn-group w-100 mt-3">

                        <Space direction="vertical" style={{ width: '100%' }}>

                            <Button onClick={handleSubmit} type="primary" block loading={isLoading} className={`promissButton h-100 py-1 w-100`}>Set Goals</Button>

                        </Space>

                    </div>
                </div>
            </div>
        </>
    )
}

export default CreateGoals