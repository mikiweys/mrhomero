const db = require('../../config/db');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Configuración de Multer para almacenamiento de imágenes
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.resolve(__dirname, '../../../frontend/public/images/menu/categorias/');
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const ext = file.originalname.split(".").pop();
        cb(null, `categoria_${Date.now()}.${ext}`);
    }
});

const upload = multer({ storage: storage });

// Función para eliminar una imagen de la carpeta
const eliminar = async (image) => {
    try {
        const filePath = path.resolve(__dirname, `../../../frontend/public/images/menu/categorias/${image}`);
        await fs.promises.unlink(filePath);
    } catch (err) {
        console.error('Error eliminando imagen:', err);
    }
};

// Mostrar todas las categorías
exports.mostrarCategorias = (req, res) => {
    const q = `SELECT * FROM categorias`;
    db.query(q, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error en el servidor');
        } else {
            return res.status(200).send(results);
        }
    });
};

// Configuración de Multer para subir una sola imagen
exports.upload = upload.single('foto');

// Crear una nueva categoría
exports.crearCategoria = (req, res) => {
    const file = req.file;
    const categoria = req.body.categoria;

    if (!file && !categoria) {
        return res.status(400).send('Debes completar todos los campos.');
    } else if (!file) {
        return res.status(400).send('Inserte una imagen.');
    } else if (!categoria) {
        return res.status(400).send('Ingrese el nombre de la categoría.');
    }

    const verificarNombre = "SELECT * FROM categorias WHERE cat_nom = ?";
    db.query(verificarNombre, [categoria], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error en el servidor');
        }
        if (results.length > 0) {
            return res.status(400).send('La categoría ya existe');
        }

        const q = "INSERT INTO categorias (`cat_nom`, `cat_foto`) VALUES (?)";
        const values = [
            categoria,
            file.filename.toString()
        ];

        db.query(q, [values], (err) => {
            if (err) {
                console.log(err);
                return res.status(500).send('Error creando la categoría');
            }
            return res.json("La categoría ha sido creada");
        });
    });
};



// Actualizar una categoría
exports.actualizarCategoria = (req, res) => {
    const id = req.params.id;
    const file = req.file;
    const nuevoNombreCategoria = req.body.categoria;

    const qSelect = "SELECT cat_nom, cat_foto FROM categorias WHERE id_categoria = ?";
    db.query(qSelect, [id], (err, data) => {
        if (err) {
            return res.status(500).json(err);
        }
        if (data.length === 0) {
            return res.status(404).json({ message: "Categoría no encontrada" });
        }

        const categoriaActual = data[0];
        const nombreActualizado = nuevoNombreCategoria || categoriaActual.cat_nom;
        const nombreFotoActualizado = file ? file.filename.toString() : categoriaActual.cat_foto;

        if (file && categoriaActual.cat_foto) {
            eliminar(categoriaActual.cat_foto);
        }

        const qUpdate = "UPDATE categorias SET cat_nom = ?, cat_foto = ? WHERE id_categoria = ?";
        const values = [nombreActualizado, nombreFotoActualizado, id];

        db.query(qUpdate, values, (err) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ message: "Error actualizando la categoría" });
            }

            return res.json("La categoría ha sido actualizada correctamente");
        });
    });
};

// Eliminar una categoría
exports.eliminarCategoria = (req, res) => {
    const id = req.params.id;
    const qimagen = "SELECT cat_foto FROM categorias WHERE id_categoria = ?";

    db.query(qimagen, [id], async (err, data) => {
        if (err) {
            return res.status(500).json(err);
        }
        if (data.length === 0) {
            return res.status(404).json({ message: "Categoría no encontrada" });
        }

        const imagen = data[0].cat_foto;
        if (imagen) {
            await eliminar(imagen);
        }

        const q = "DELETE FROM categorias WHERE id_categoria = ?";
        db.query(q, [id], (err, data) => {
            if (err) {
                return res.status(500).json(err);
            }
            return res.json("La categoría se ha eliminado correctamente");
        });
    });
};

//PRODUCTOS

const storageProductos = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.resolve(__dirname, '../../../frontend/public/images/menu/productos/');
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const ext = file.originalname.split(".").pop();
        cb(null, `producto_${Date.now()}.${ext}`);
    }
})

const uploadProductos = multer({ storage: storageProductos })

//Eliminar de carpeta de productos 

const eliminarImagenProducto = async (image) => {
    try {
        const filePath = path.resolve(__dirname, `../../../frontend/public/images/menu/productos/${image}`);
        await fs.promises.unlink(filePath);
    } catch (err) {
        console.error('Error eliminando imagen:', err);
    }
};

exports.mostrarProductos = (req, res) => {
    const id = req.params.id;
    const q = "SELECT * FROM productos where id_categoria = ?";
    db.query(q, [id], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error en el servidor');
        } else {
            return res.status(200).send(results);
        }
    });
};

// Crear un nuevo producto
exports.crearProducto = (req, res) => {
    const file = req.file;
    const nombre = req.body.nombre;
    const precio = req.body.precio;
    constid_categoria = req.body.id_categoria;

    if (!file || !nombre || !precio || !id_categoria) {
        return res.status(400).send('Debes completar todos los campos.');
    } else if (!file) {
        return res.status(400).send('Inserte una imagen.');
    } else if (!nombre) {
        return res.status(400).send('Ingrese el nombre del producto.');
    } else if (!id_categoria) {
        return res.status(400).send('Seleccione una categoria.');
    }

    const q = "INSERT INTO productos (`pro_nom`, `pro_foto`, `pro_precio`, `id_categoria`) VALUES (?)";
    const values = [
        nombre,
        file.filename.toString(),
        precio,
        id_categoria
    ];

    db.query(q, [values], (err) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error creando el producto');
        }
        return res.status(200).send("El producto ha sido creado");
    });
};

// Actualizar un producto
exports.actualizarProducto = (req, res) => {
}
// Borrar un producto
exports.borrarProducto = (req, res) => {
    const id = req.params.id;
    const qimagen = "SELECT pro_foto FROM productos WHERE id_producto = ?";

    db.query(qimagen, [id], async (err, data) => {
        if (err) {
            return res.status(500).json(err);
        }
        if (data.length === 0) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        const imagen = data[0].pro_foto;
        if (imagen) {
            await eliminarImagenProducto(imagen);
        }

        const q = "DELETE FROM productos WHERE id_producto = ?";
        db.query(q, [id], (err, data) => {
            if (err) {
                return res.status(500).json(err);
            }
            return res.json("El producto se ha eliminado correctamente");
        });
    });
};