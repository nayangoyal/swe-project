import React from 'react'
import {Tabs} from "antd";
import Booking from "./Booking";
import CreateRoom from "./CreateRoom";
import axios from 'axios';

const {TabPane} = Tabs;
function AdminScreen() {
    const token = localStorage.getItem('userToken');
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return (
        <div className='mt-3 ml-3 mr-3 bs'>
            <h2 className='text-center' style={{fontSize: '30px'}}><b>Admin Panel</b></h2>
            <Tabs defaultActivity="1">
                <TabPane tab="Booking" key="1">
                    <Booking />
                </TabPane>
                <TabPane tab="Add Rooms" key="3">
                    <CreateRoom />
                </TabPane>
                <TabPane tab="User" key="4">
                    <h1>Users</h1>
                </TabPane>
            </Tabs>
        </div>
    )
}

export default AdminScreen;

