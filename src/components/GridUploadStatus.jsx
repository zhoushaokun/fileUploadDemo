import React, { Component } from 'react'
import {
    Button,
    Row,
    Col,
} from 'antd'
import {
    LoadingOutlined,
} from '@ant-design/icons';
import './index.css';

function request(item) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const isSuccess = Math.floor(Math.random() * 10) < 7;
            if (isSuccess) {
                resolve(item);
            }
            else reject(item);
        }, Math.random()*2000 + 1000);
    });
}




export default class GridUploadStatus extends Component {
    static success = 2;
    static fail = 3;
    static ready = 0;
    static processing = 1;

    constructor(props){
        super(props);
        const { data } = this.props
        this.state = {
            // finished: [],
            // current: [],
            // toUpload: new Array(data.length).fill(GridUploadStatus.ready),
            ceilFlags: new Array(data.length).fill(GridUploadStatus.ready),
        };
    }

    trigger = () => {
        let num = 1;
        const { data } = this.props;
        const setFlag = (item, flag, ceilFlags) => {
            const tempList = [...ceilFlags];
            for (let i = 0; i < item.length; i++) {                    
                tempList[item[i]] = flag;
            }
            this.setState({
                ceilFlags: tempList,
            });
        }

        const upload = (item) => {
            const self = this;
            request(item).then((item) => {
                setFlag([item], GridUploadStatus.success, self.state.ceilFlags);
                num--;
            })
            .then(() => {
                parellUpload();
            })
            .catch((item) => {
                setFlag([item], GridUploadStatus.fail, self.state.ceilFlags);
                num--;
                data.unshift(item);
                parellUpload();
            });
        }

        const parellUpload = () => {
            // 并发量为 5
            const toAdd = [];
            for (let i = num; i <= 5; i ++) {
                toAdd.push(data.shift());
            }
            setFlag(toAdd, GridUploadStatus.processing, this.state.ceilFlags);
            while (data.length > 0 && num <= 5) {
                const item = toAdd.shift();
                upload(item);
                num ++;
            }
        }

        parellUpload();
    };
        
    render (){
        const { ceilFlags } = this.state
        return (
            <div style={{ width: '300px', height: '300px' }}>
                <Button onClick={this.trigger}>测试</Button>
                <Row gutter={0} style={{ height: '300px' }}>
                    {ceilFlags.map((flag) => colList[flag])}
                </Row>
            </div>
        );
    }
}

var colList = {
    [GridUploadStatus.ready]: <Col span={2} className='uploadStatus-ceil'></Col>,
    [GridUploadStatus.success]: <Col span={2} className='uploadStatus-ceil success'></Col>,
    [GridUploadStatus.processing]: <Col span={2} className='uploadStatus-ceil'>
        <LoadingOutlined spin={true}></LoadingOutlined>
    </Col>,
    [GridUploadStatus.fail]: <Col span={2} className='uploadStatus-ceil fail'></Col>,
};