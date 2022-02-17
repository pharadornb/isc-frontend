import React, { useState } from "react";

const HeaderTable = ({ headers, onSorting }) => {
    const [sortingField, setSortingField] = useState("");
    const [sortingOrder, setSortingOrder] = useState("asc");

    const onSortingChange = (field) => {
        const order = field === sortingField && sortingOrder === "asc" ? "desc" : "asc";
        setSortingField(field);
        setSortingOrder(order);
        onSorting(field, order);
    };

    return (
        <thead style={{textAlign: "center"}}>
        <tr>
            {headers.map(({ name, field, sortable }) => (
                <th key={name} onClick={() => sortable ? onSortingChange(field) : null}>{name}</th>
            ))}
        </tr>
        </thead>
    );
};

export default HeaderTable;