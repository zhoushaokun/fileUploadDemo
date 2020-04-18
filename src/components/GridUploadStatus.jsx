import React from 'react'
import {
    Row,
    Col,
} from 'antd'
import {
    LoadingOutlined,
} from '@ant-design/icons';
import './index.css';

export default function GridUploadStatus() {
    const Cols = new Array(12*12).fill(
        <Col span={2} className='uploadStatus-ceil'>
            <LoadingOutlined  spin={true}></LoadingOutlined>
        </Col>
    );
    return (
        <div style={{width: '300px', height:'300px'}}>
            <Row gutter={0} style={{height:'300px'}}>
                {Cols}
            </Row>       
        </div>
    )
}
