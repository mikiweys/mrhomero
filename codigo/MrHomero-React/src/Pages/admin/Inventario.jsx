import React from 'react'
import Swal from 'sweetalert2';

export default function Inventario() {
  function Fila() {
    return (
      <tr>
        <th scope="row">#</th>
        <td>Nombre</td>
        <td>Categoria</td>
        <td>31/12/2999</td>
        <td>31/12/2999</td>
        <td>###</td>
        <td>
          <div className="d-flex ">
            <button type="button" className="btn btn-outline-warning me-3" data-bs-toggle="modal" data-bs-target="#ModalEditarCategoria">
              <i className="bi bi-pencil-square"></i>
            </button>
            <div className="modal fade" id="ModalEditarCategoria" tabIndex="-1" aria-labelledby="ModalEditarCategoriaLabel" aria-hidden="true">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="ModalEditarCategoriaLabel">Editar producto</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                    <div className="row p-3">
                      <div className="col-12 mb-3">
                        <label htmlFor="floatingInput">Imagen</label>
                        <input className='form-control' type="file" accept='image/*' autoComplete='off' id='photo' name='photo' required />
                      </div>
                      <div className="col-12 mb-3">
                        <label htmlFor="floatingInput">Producto</label>
                        <select name="" className="form-select" id="">
                          <option value="1" selected disabled>Producto...</option>
                          <option value="2">Hamburguesa Clasica</option>
                          <option value="3">Perros Calientes XL </option>
                        </select>
                      </div>
                      <div className="col-12 mb-3">
                        <label htmlFor="floatingInput">Precio</label>
                        <input className='form-control' type="number" autoComplete='off' id='nom_cat' name='nom_cat' required min={0} step={50} />
                      </div>
                      <div className="col-12 mb-3">
                        <select name="" className="form-select" id="" required>
                          <option value="1" selected disabled>Categoria...</option>
                          <option value="2">Hamburguesas</option>
                          <option value="3">Perros Calientes</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
                    <button type="button" className="btn btn-warning" onClick={() => {
                      Swal.fire({
                        title: 'Producto editado',
                        text: 'El producto fue editado correctamente',
                        icon: 'success',
                        confirmButtonText: 'Hecho'
                      })
                    }}>Guardar cambios</button>
                  </div>
                </div>
              </div>
            </div>
            <button type="button" className="btn btn-outline-danger" onClick={() => {
              Swal.fire({
                title: "¿Estas seguro?",
                text: "¡No puedes revertir esta accion!",
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "¡Si, borrar!",
                cancelButtonText: "Cancelar"
              }).then((result) => {
                if (result.isConfirmed) {
                  Swal.fire({
                    title: 'Producto eliminado',
                    text: 'El producto fue eliminado correctamente',
                    icon: 'success',
                    confirmButtonText: 'Hecho'
                  });
                }
              });
            }}><i className="bi bi-trash"></i></button>
          </div>
        </td>
      </tr>
    )
  }
  return (
    <div className='container p-5'>
      <div className="row">
        <div className="col-12 col-sm-9">
          <div className="d-flex justify-content-between">
            <h1>Inventario</h1>
            <button type="button" className="btn btn-success"><i className="bi bi-plus"></i>Añadir</button>
          </div>
          <div className="table-responsive">
            <table className=" table table-striped mt-5">
              <thead>
                <tr>
                  <th scope="col">id</th>
                  <th scope="col">Producto</th>
                  <th scope="col">Categoria</th>
                  <th scope="col">Fecha de ingreso</th>
                  <th scope="col">Fecha de caducidad</th>
                  <th scope="col">Cantidad</th>
                  <th scope="col">Editar</th>
                </tr>
              </thead>
              <tbody>
                {Fila()}
                {Fila()}
                {Fila()}
                {Fila()}
                {Fila()}
                {Fila()}
              </tbody>
            </table>
            <nav aria-label="Page navigation example">
              <ul className="pagination">
                <li className="page-item">
                  <a className="page-link text-warning" href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                  </a>
                </li>
                <li className="page-item"><a className="page-link text-warning" href="#">1</a></li>
                <li className="page-item"><a className="page-link text-warning" href="#">2</a></li>
                <li className="page-item"><a className="page-link text-warning" href="#">3</a></li>
                <li className="page-item">
                  <a className="page-link text-warning" href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <div className="col-12 col-sm-3">
          <h2>Bajo stock</h2>
          <div className="card p-5">
            <div className="card-body d-flex justify-content-between align-items-center">
              <img className="img-fluid" src="img.png" alt="Title" />
              <div className="">
                <h4 className="card-title">Title</h4>
                <p className="card-text">Body</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}