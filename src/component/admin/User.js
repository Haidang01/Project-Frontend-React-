import { useEffect, useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import { updateRole, setCurrentPage, hanldeDataTable, setCurrentPage1 } from '../../redux/slice/managerSlice';
import { fetchListUser } from '../../redux/slice/managerSlice';
import { CiEdit } from 'react-icons/ci';
import { FcPlus } from 'react-icons/fc';
import { FaTrash } from 'react-icons/fa';
import ModalDeleteUser from './Modal/ModalDeleteUser';
import './User.scss'
import ModelCreateUser from './Modal/ModalCreateUser';
import ModelEditUser from './Modal/ModalEditUser';
function User() {
    const [currentLimit, setCurrentLimit] = useState(4);
    const role = useSelector(state => state.manager.role)
    const pageCount = useSelector(state => state.manager.pageCount)
    const currentPage = useSelector(state => state.manager.currentPage)
    const listUser = useSelector(state => state.manager.listUser)
    const [showDeleteUser, setShowDeleteUser] = useState(false);
    const [showCreateUser, setShowCreateUser] = useState(false);
    const [showEditUser, setShowEditUser] = useState(false);
    const handlePageClick = (event) => {
        console.log(event);
        dispatch(setCurrentPage(event.selected + 1))
    }
    const dispatch = useDispatch();
    useEffect(() => {
        let data = { role, currentPage, currentLimit }
        dispatch(fetchListUser(data))
    }, [currentPage, role])
    const handleDeleteUser = (user) => {
        dispatch(hanldeDataTable(user))
        setShowDeleteUser(true)
    }

    const handleEditUser = (user) => {
        dispatch(hanldeDataTable(user))
        setShowEditUser(true)
    }
    return (

        <Container>
            <div className='fs-2 text-center mb-2 fw-normal'>Management User</div>

            <div className='mb-4 row d-flex gap-5'>
                <div className='col-8 mx-2'>
                    <Button variant="primary" size="lg"
                        onClick={() => setShowCreateUser(true)}
                    >
                        <FcPlus />
                        <span className='mx-2'>
                            Create new User
                        </span>
                    </Button>
                </div>
                <div className='col-3 '>
                    <select className="form-select  "
                        aria-label=".form-select-lg example"
                        onChange={(event) => {
                            dispatch(setCurrentPage1(1));
                            dispatch(updateRole(event.target.value))
                        }
                        }

                        value={role}
                    >
                        <option value='Student'>Student</option>
                        <option value="Teacher">Teacher</option>
                    </select>
                </div>
            </div>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Email</th>
                        <th>Username</th>
                        <th>Address</th>
                        <th>Phone</th>
                        <th>Sex</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listUser && listUser.length > 0 ?
                        <>
                            {listUser.map((item, index) => {
                                return (
                                    <tr key={`table-${index}`}>
                                        <td>{(currentPage - 1) * currentLimit + index + 1}</td>
                                        <td>{item.email}</td>
                                        <td>{item.username}</td>
                                        <td>{item.address === null ? 'null' : item.address}</td>
                                        <td>{item.phone === null ? 'null' : item.phone}</td>
                                        <td>{item.sex === null ? 'null' : item.sex}</td>
                                        <td>
                                            <span className='fs-4 mx-4 cursor' style={{ color: 'seagreen' }}
                                                onClick={() => handleEditUser(item)}
                                            ><CiEdit /></span>
                                            <span className='fs-5 cursor'
                                                style={{ color: 'dimgrey' }}
                                                onClick={() => handleDeleteUser(item)}
                                            ><FaTrash /></span>
                                        </td>
                                    </tr>
                                )
                            })}
                        </>
                        :
                        <>
                            <tr>
                                <td>Not found data</td>
                            </tr>

                        </>
                    }
                </tbody>
            </Table>
            <div className='user-footer mt-4'>
                {pageCount > 1 &&
                    <ReactPaginate
                        previousLabel="previous"
                        nextLabel="next"
                        breakLabel="..."
                        breakClassName="page-item"
                        breakLinkClassName="page-link"
                        pageCount={pageCount}
                        pageRangeDisplayed={2}
                        marginPagesDisplayed={2}
                        onPageChange={handlePageClick}
                        containerClassName="pagination justify-content-center"
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        previousClassName="page-item"
                        previousLinkClassName="page-link"
                        nextClassName="page-item"
                        nextLinkClassName="page-link"
                        activeClassName="active"
                    />
                }
            </div>
            <ModalDeleteUser
                showDeleteUser={showDeleteUser}
                setShowDeleteUser={setShowDeleteUser}
                currentLimit={currentLimit}

            />
            <ModelCreateUser
                showCreateUser={showCreateUser}
                setShowCreateUser={setShowCreateUser}
                currentLimit={currentLimit}
            />
            <ModelEditUser
                showEditUser={showEditUser}
                setShowEditUser={setShowEditUser}
                currentLimit={currentLimit}

            />
        </Container>

    );
}

export default User;