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
    ButtonGroup
} from '@mui/material';
import { styled} from '@mui/system';

/******* style ********/

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
}));

/*******************/
const TableHeader = () => {
    return (
        <TableHead>
            <TableRow>
                <TableCell>Имя</TableCell>
                <TableCell>Фамилия</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Действия</TableCell>
            </TableRow>
        </TableHead>
    );
}

const TableBodyComponent = props => {
    const rows = props.characterData.map((row, index) => {
        return (
            <StyledTableRow key={index}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.last_name}</TableCell>
                <TableCell>{row.email}</TableCell>
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
}

const TableComponent = (props) => {
    const { characterData, removeCharacter, changeCharacter } = props;
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHeader />
                <TableBodyComponent
                    characterData={characterData}
                    removeCharacter={removeCharacter}
                    changeCharacter={changeCharacter}
                />

            </Table>
        </TableContainer>
    );
}

export default TableComponent;