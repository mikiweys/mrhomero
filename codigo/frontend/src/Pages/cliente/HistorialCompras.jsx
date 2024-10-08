import React from 'react'
import NavegacionCliente from '../../navigation/NavegacionCliente'
import img from '../../assets/img/img.png'
import '../../styles/style.css'

export default function HistorialCompras() {
    function cardHistorial() {
        return (
            <div className="row">
                <div className="col col-sm-6">
                    <div className="container-card scrollbar" >
                        <div className='border border-2 d-flex rounded mb-3'>
                            <img className="card-img-top border m-3 rounded " src={img} alt="..." style={{ width: '150px', height: '150px' }} />
                            <div className="card-body ps-2 pt-2">
                                <h1 className="card-title">Hamburguesa</h1>
                                <h5 className="card-text py-2">Categoria: Hamburguesa</h5>
                                <div className='' style={{ maxHeight: '50px', overflowY: 'auto' }}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa voluptatem rerum adipisci magni modi tempora magnam explicabo minima, quod cupiditate ut eum et. Eius quam vitae fuga, saepe nesciunt libero?</div>
                            </div>
                            <div className="card-price ps-2 pt-2">
                                <h1 className="pe-1">$100</h1>
                                <h5 className="text-end py-2 pe-2">x$100</h5>
                                <h5 className="text-end align-text-end pe-2">Total: $100</h5>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col col-sm-6">
                    <h2 className="ps-4 py-2 d-flex justify-content-center" style={{ fontSize: '68px' }}>99</h2>
                    <h3 className="ps-4 py-2 d-flex justify-content-center" style={{ fontSize: '50px' }}>Puntos</h3>
                </div>
            </div>
        )
    }

    return (
        <div>
            <NavegacionCliente />
            <div className="container">
                <div className="d-flex  justify-content-around">
                    <h1 className="py-3">Historial de compras</h1>
                    <h1 className="ps-5 py-3">Puntos ganados</h1>
                </div>
                <div className="">
                    {cardHistorial()}
                    {cardHistorial()}
                    {cardHistorial()}
                    {cardHistorial()}
                    {cardHistorial()}
                </div>


            </div>
        </div>
    )
}
