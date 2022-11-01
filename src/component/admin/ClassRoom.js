import { useEffect, useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import { CiEdit } from 'react-icons/ci';
import { FcPlus } from 'react-icons/fc';
import { FaTrash } from 'react-icons/fa';
import './User.scss'
import { fetchListClassAdmin, setCurrentPageClass } from '../../redux/slice/managerClass'
const ClassRoom = () => {
  const [currentLimit, setCurrentLimit] = useState(4);
  const listClass = useSelector(state => state.classAdmin.listClass)
  const pageCount = useSelector(state => state.classAdmin.pageCountClass);
  const currentPage = useSelector(state => state.classAdmin.currentPage);
  const students = useSelector(state => state.classAdmin.students);
  console.log('check ', students);


  const [showDeleteUser, setShowDeleteUser] = useState(false);
  const [showCreateUser, setShowCreateUser] = useState(false);
  const [showEditUser, setShowEditUser] = useState(false);
  const handlePageClick = (event) => {
    console.log(event);
    dispatch(setCurrentPageClass(event.selected + 1))
  }
  const dispatch = useDispatch();
  useEffect(() => {
    let data = { currentPage, currentLimit }
    dispatch(fetchListClassAdmin(data))
  }, [currentPage])
  const handlePageClickClass = (event) => {
    dispatch(setCurrentPageClass(event.selected + 1))
  }
  return (
    <>
      <Container>
        <div className='fs-2 text-center mb-2 fw-normal my-4'>Management Class</div>

        <Table striped bordered hover className='my-5'>
          <thead>
            <tr>
              <th>No</th>
              <th>ClassName</th>
              <th>Teacher</th>
              <th>Number of members</th>
              <th>Password</th>

            </tr>
          </thead>
          <tbody>
            {listClass && listClass.length > 0 ?
              <>
                {listClass.map((item, index) => {
                  return (
                    <tr key={`table-${index}`}>
                      <td>{(currentPage - 1) * currentLimit + index + 1}</td>
                      <td>{item.className === null ? '' : item.className}</td>
                      <td>{item.teacherName === null ? '' : item.teacherName}</td>
                      <td>
                        {students ? students[index].length : '0'}
                      </td>
                      <td>
                        {item.password === null ? '' : item.password}
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
              onPageChange={handlePageClickClass}
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
      </Container>

    </>
  )
}

export default ClassRoom