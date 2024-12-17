import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Container, Typography } from '@mui/material';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import axios from 'axios';
import { API_BASE_URL } from '../config/ApiConfig';
import { ClientSideRowModelModule } from 'ag-grid-community';
import { useNavigate } from 'react-router-dom';

const UsersTable = () => {
    const isAuthenticated = useSelector(state => state.authState.isAuthenticated);
    const userRole = useSelector(state => state.authState.user?.role);
    const token = useSelector(state => state.authState.user?.token);
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated && userRole === 'ROLE_ADMIN') {
            const fetchUsers = async () => {
                try {
                    const response = await axios.get(`${API_BASE_URL}/users`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    setUsers(response.data);
                } catch (error) {
                    console.error('Error fetching users:', error);
                }
            };
            fetchUsers();
        }
    }, [isAuthenticated, userRole, token]);

    const columnDefs = [
        { headerName: 'ID', field: 'id' },
        { headerName: 'Username', field: 'username' },
        { headerName: 'Email', field: 'email' },
        { headerName: 'Role', field: 'role' },
    ];

    const onRowClicked = (event) => {
        navigate(`/users/${event.data.id}`);
    };

    return (
        <Container>
            <Typography variant="h6">Список пользователей</Typography>
            <div className="ag-theme-alpine" style={{ height: '500px', width: '100%' }}>
                <AgGridReact
                    modules={[ClientSideRowModelModule]}
                    rowData={users}
                    columnDefs={columnDefs}
                    onRowClicked={onRowClicked}
                    rowStyle={{ cursor: 'pointer' }}
                    getRowStyle={params => ({
                        backgroundColor: params.node.rowIndex % 2 === 0 ? '#a65e5e' : '#ffffff'
                    })}
                />
            </div>
        </Container>
    );
};

export default UsersTable;
