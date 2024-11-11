import React from 'react';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, ButtonGroup, TextField
} from '@mui/material';
import {styled} from '@mui/system';

/******* style ********/

const StyledTableRow = styled(TableRow)(({theme}) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    }, '&:nth-of-type(even)': {
        backgroundColor: theme.palette.background.default,
    },
}));

const StyledTableCell = styled(TableCell)(({theme}) => ({
    backgroundColor: theme.palette.background.alternate, color: theme.palette.text.primary,
}));

/** ************* **/
const TableHeader = () => (<TableHead>
        <StyledTableRow>
            <StyledTableCell>Имя</StyledTableCell>
            <StyledTableCell>Фамилия</StyledTableCell>
            <StyledTableCell>Email</StyledTableCell>
            <StyledTableCell>Действия</StyledTableCell>
        </StyledTableRow>
    </TableHead>);

const EditableCell = ({isEditable, value, handleFieldChange, handleFieldClick}) => (isEditable ? (<TextField
            value={value}
            onChange={handleFieldChange}
            onBlur={handleFieldClick}
            autoFocus
        />) : (value));

const TableBodyComponent = ({
                                characterData,
                                editableField,
                                handleFieldClick,
                                handleFieldChange,
                                removeCharacter,
                                changeCharacter
                            }) => {
    return (<TableBody>
            {characterData.map((row, index) => (<StyledTableRow key={index}>
                    <TableCell onClick={() => handleFieldClick(index, 'name')}>
                        <EditableCell
                            isEditable={editableField.index === index && editableField.field === 'name'}
                            value={row.name}
                            handleFieldChange={(e) => handleFieldChange(e, index, 'name')}
                            handleFieldClick={() => handleFieldClick(null, '')}
                        />
                    </TableCell>
                    <TableCell onClick={() => handleFieldClick(index, 'last_name')}>
                        <EditableCell
                            isEditable={editableField.index === index && editableField.field === 'last_name'}
                            value={row.last_name}
                            handleFieldChange={(e) => handleFieldChange(e, index, 'last_name')}
                            handleFieldClick={() => handleFieldClick(null, '')}
                        />
                    </TableCell>
                    <TableCell onClick={() => handleFieldClick(index, 'email')}>
                        <EditableCell
                            isEditable={editableField.index === index && editableField.field === 'email'}
                            value={row.email}
                            handleFieldChange={(e) => handleFieldChange(e, index, 'email')}
                            handleFieldClick={() => handleFieldClick(null, '')}
                        />
                    </TableCell>
                    <TableCell>
                        <ButtonGroup size="small" aria-label="small primary button group">
                            <Button
                                variant="contained"
                                color="deleteColor"
                                onClick={() => removeCharacter(index)}
                            >
                                Удалить
                            </Button>
                            <Button
                                variant="contained"
                                color="editColor"
                                onClick={() => changeCharacter(index)}
                            >
                                Изменить
                            </Button>
                        </ButtonGroup>
                    </TableCell>
                </StyledTableRow>))}
        </TableBody>);
};

const TableComponent = (props) => (<TableContainer component={Paper}>
        <Table>
            <TableHeader/>
            <TableBodyComponent {...props} />
        </Table>
    </TableContainer>);

export default TableComponent;
