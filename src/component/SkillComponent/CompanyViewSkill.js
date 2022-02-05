import React, {useEffect, useState, useMemo} from "react";
import HeaderTable from "./HeaderTable"
import PaginationTable from "./PaginationTable"
import SearchTable from "./SearchTable"

export default function CompanyViewSkill() {

    const [comments, setComments] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");

    const ITEMS_PER_PAGE = 25;

    const headers = [
        {name: "No#", field: "id", sortable: false},
        {name: "Name", field: "name", sortable: false},
        {name: "Email", field: "email", sortable: false},
        {name: "Comment", field: "body", sortable: false}
    ];

    useEffect(() => {
        const getData = () => {

            fetch("https://jsonplaceholder.typicode.com/comments")
                .then(response => response.json())
                .then(json => {
                    setComments(json);
                });
        };

        getData();
    }, []);
    
    const commentsData = useMemo(() => {
        let computedComments = comments;

        if (search) {
            computedComments = computedComments.filter(
                comment => comment.name.toLowerCase().includes(search.toLowerCase()) ||
                    comment.email.toLowerCase().includes(search.toLowerCase())
            );
        }

        setTotalItems(computedComments.length);

        return computedComments.slice(
            (currentPage - 1) * ITEMS_PER_PAGE,
            (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
        );
    }, [comments, currentPage, search]);

    return (
        <div className="row" style={{width: '95%'}}>
            <div className="col mb-3 col-12">
                <div className="row">
                    <div className="col-md-6">
                        <h2>คลังเก็บทักษะที่สร้าง</h2>
                    </div>
                    <div className="col-md-6 d-flex flex-row-reverse">
                        <SearchTable onSearch={value => {
                            setSearch(value);
                            setCurrentPage(1);
                        }}
                        />
                    </div>
                </div>

                <table className="table table-striped">
                    <HeaderTable headers={headers}/>
                    <tbody>
                    {commentsData.map(comment => (
                        <tr key={comment.id}>
                            <th scope="row">{comment.id}</th>
                            <td>{comment.name}</td>
                            <td>{comment.email}</td>
                            <td>{comment.body}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <div align={'center'}>
                    <PaginationTable
                        total={totalItems}
                        itemsPerPage={ITEMS_PER_PAGE}
                        currentPage={currentPage}
                        onPageChange={page => setCurrentPage(page)}
                    />
                </div>

            </div>
        </div>
    );
}