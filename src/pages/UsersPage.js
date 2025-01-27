import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Container, Typography } from '@mui/material';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { ClientSideRowModelModule } from 'ag-grid-community';
import { useNavigate } from 'react-router-dom';
import instance from "../config/axios";

const UsersPage = () => {
    const isAuthenticated = useSelector(state => state.authState.isAuthenticated);
    const userRole = useSelector(state => state.authState.user?.role);

    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated && userRole === 'ROLE_ADMIN') {
            const fetchUsers = async () => {
                try {
                    const response = await instance.get('/users');
                    setUsers(response.data);
                } catch (error) {
                    console.error('Error fetching users:', error);
                }
            };
            fetchUsers();
        }
    }, [isAuthenticated, userRole]);

    const columnDefs = [
        { headerName: 'ID', field: 'id', width: 100 },
        { headerName: 'Username', field: 'username', flex: 1 },
        { headerName: 'Email', field: 'email', flex: 2 },
        { headerName: 'Role', field: 'role', flex: 1 },
    ];

    const onRowClicked = (event) => {
        navigate(`/users/${event.data.id}`);
    };

    return (
        <Container>
            <Typography variant="h6" gutterBottom>Список пользователей</Typography>
            <div className="ag-theme-alpine" style={{ height: '500px', width: '100%' }}>
                <AgGridReact
                    modules={[ClientSideRowModelModule]}
                    rowData={users}
                    columnDefs={columnDefs}
                    onRowClicked={onRowClicked}
                    rowStyle={{ cursor: 'pointer', height: '60px' }}
                    getRowStyle={params => ({
                        backgroundColor: params.node.rowIndex % 2 === 0 ? '#e0f7fa' : '#ffffff',
                        height: '60px',
                    })}
                    defaultColDef={{
                        resizable: true,
                        minWidth: 100,
                        maxWidth: 400,
                    }}
                />
            </div>
        </Container>
    );
};

export default UsersPage;
