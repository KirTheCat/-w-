import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    ButtonGroup,
    TextField
} from '@mui/material';
import { styled } from '@mui/system';

/******* style ********/

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:nth-of-type(even)': {
        backgroundColor: theme.palette.background.default,
    },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    backgroundColor: theme.palette.background.alternate,
    color: theme.palette.text.primary,
}));

/*****************/
const TableHeader = () => {
    return (
        <TableHead>
            <StyledTableRow>
                <StyledTableCell>Имя</StyledTableCell>
                <StyledTableCell>Фамилия</StyledTableCell>
                <StyledTableCell>Email</StyledTableCell>
                <StyledTableCell>Действия</StyledTableCell>
            </StyledTableRow>
        </TableHead>
    );
}

const TableBodyComponent = (props) => {
    const rows = props.characterData.map((row, index) => {
        return (
            <StyledTableRow key={index}>
                <TableCell onClick={() => props.handleFieldClick(index, 'name')}>
                    {props.editableField.index === index && props.editableField.field === 'name' ? (
                        <TextField
                            value={row.name}
                            onChange={(e) => props.handleFieldChange(e, index, 'name')}
                            onBlur={() => props.handleFieldClick(null, '')}
                            autoFocus
                        />
                    ) : (
                        row.name
                    )}
                </TableCell>
                <TableCell onClick={() => props.handleFieldClick(index, 'last_name')}>
                    {props.editableField.index === index && props.editableField.field === 'last_name' ? (
                        <TextField
                            value={row.last_name}
                            onChange={(e) => props.handleFieldChange(e, index, 'last_name')}
                            onBlur={() => props.handleFieldClick(null, '')}
                            autoFocus
                        />
                    ) : (
                        row.last_name
                    )}
                </TableCell>
                <TableCell onClick={() => props.handleFieldClick(index, 'email')}>
                    {props.editableField.index === index && props.editableField.field === 'email' ? (
                        <TextField
                            value={row.email}
                            onChange={(e) => props.handleFieldChange(e, index, 'email')}
                            onBlur={() => props.handleFieldClick(null, '')}
                            autoFocus
                        />
                    ) : (
                        row.email
                    )}
                </TableCell>
                <TableCell>
                    <ButtonGroup size="small" aria-label="small primary button group">
                        <Button
                            variant="contained"
                            color="deleteColor"
                            onClick={() => props.removeCharacter(index)}
                        >
                            Удалить
                        </Button>

                        <Button
                            variant="contained"
                            color="editColor"
                            onClick={() => props.changeCharacter(index)}
                        >
                            Изменить
                        </Button>
                    </ButtonGroup>
                </TableCell>
            </StyledTableRow>
        );
    });

    return <TableBody>{rows}</TableBody>;
};

const TableComponent = (props) => {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHeader />
                <TableBodyComponent {...props} />
            </Table>
        </TableContainer>
    );
};

export default TableComponent;
