import { Container, Row, Col, Button, Modal, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { BiPlus } from 'react-icons/bi';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [stock, setStock] = useState('');
  const [category, setCategory] = useState('');
  const [editProduct, setEditProduct] = useState(null);
  const [products, setProducts] = useState([]);
  

  

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    fetch(`${process.env.REACT_APP_API_URL}/products`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(response => response.json())
      .then(data => {
        setProducts(data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditProduct(null);
    resetFormValues();
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleSaveProduct = () => {
    const productData = {
      name,
      description,
      price,
      isActive: isActive,
      stock,
      category
    };

    fetch(`${process.env.REACT_APP_API_URL}/products/addProduct`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(productData)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Product created:', data);
        handleCloseModal();
        fetchProducts(); // Fetch updated product list
      })
      .catch(error => {
        console.error('Error creating product:', error);
      });
  };

  const handleEditProduct = product => {
    setEditProduct(product);

    setName(product.name);
    setDescription(product.description);
    setPrice(product.price);
    setIsActive(product.isActive);
    setStock(product.stock);
    setCategory(product.category);

    setShowModal(true);
  };

  const handleUpdateProduct = () => {
    const editData = {
      name,
      description,
      price,
      isActive,
      stock,
      category
    };

    fetch(`${process.env.REACT_APP_API_URL}/products/${editProduct._id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(editData)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Product updated:', data);
        handleCloseModal();
        fetchProducts(); // Fetch updated product list
        const updatedProductIndex = products.findIndex(product => product._id === editProduct._id);
      
      // Create a copy of the products array
      const updatedProducts = [...products];
      
      // Update the isActive property of the corresponding product in the copied array
      updatedProducts[updatedProductIndex].isActive = isActive;
      
      // Set the updated products array in the state
      setProducts(updatedProducts);
      })
      .catch(error => {
        console.error('Error updating product:', error);
      });
  };

  const resetFormValues = () => {
    setName('');
    setDescription('');
    setPrice('');
    setIsActive(false);
    setStock('');
    setCategory('');
  };

  return (
      <Container>
        <Row className="mt-4">
          <Col>
            <h1 className="mt-5">Admin Dashboard</h1>
          </Col>
        </Row>

        <Row className="mt-4">
          <Col>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <Button className="rounded-0 add-product-button" onClick={handleOpenModal}>
                <BiPlus className="mr-1" /> Add Product
              </Button>
            </div>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <Button className="rounded-0 add-product-button mt-3" as={Link} to="/orders">
                View All Orders
              </Button>
            </div>
          </Col>
        </Row>

        <Row className="mt-4">
          <Col>
            <div className="table-responsive">
              <div className="product-table">
                <table className="table table-bordered table-striped centered-table">
                  <thead>
                    <tr className="tableHead">
                      <th className="text-center">No.</th>
                      <th className="text-center">Product ID</th>
                      <th className="text-center">Product Name</th>
                      <th className="text-center">Description</th>
                      <th className="text-center">Price (Php)</th>
                      <th className="text-center">IsActive</th>
                      <th className="text-center">Stock</th>
                      <th className="text-center">Category</th>
                      <th className="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products && products.map((product, index) => (
                      <tr key={product._id}>
                        <td className="text-center">{index + 1}</td>
                        <td className="text-center">{product._id}</td>
                        <td className="text-center">{product.name}</td>
                        <td className="text-center">{product.description}</td>
                        <td className="text-center">{product.price}</td>
                        <td className="text-center">{product.isActive ? 'Yes' : 'No'}</td>
                        <td className="text-center">{product.stock}</td>
                        <td className="text-center">{product.category}</td>
                        <td className="text-center">
                          <Button className="rounded-0 editButton" onClick={() => handleEditProduct(product)}>
                            Edit
                          </Button>
                        </td>
                        
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Col>
        </Row>

        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>{editProduct ? 'Edit Product' : 'Add Product'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="productName">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="rounded-0"
                />
              </Form.Group>

              <Form.Group controlId="description">
                <Form.Label className="mt-3">Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  className="rounded-0"
                />
              </Form.Group>

              <Form.Group controlId="price">
                <Form.Label className="mt-3">Price</Form.Label>
                <Form.Control
                  type="text"
                  value={price}
                  onChange={e => setPrice(e.target.value)}
                  className="rounded-0"
                />
              </Form.Group>

              <Form.Group controlId="isActive">
                <Form.Label className="mt-3">Is Active</Form.Label>
                <Form.Check
                  type="checkbox"
                  checked={isActive}
                  onChange={() => setIsActive(prevIsActive => !prevIsActive)}
                  className="rounded-0"
                />

              </Form.Group>

              <Form.Group controlId="stock">
                <Form.Label className="mt-3">Stock</Form.Label>
                <Form.Control
                  type="text"
                  value={stock}
                  onChange={e => setStock(e.target.value)}
                  className="rounded-0"
                />
              </Form.Group>

              <Form.Group controlId="category">
                <Form.Label className="mt-3">Category</Form.Label>
                <Form.Control
                  type="text"
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  className="rounded-0"
                />
              </Form.Group>

            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" className="rounded-0" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button variant="primary" className="rounded-0" onClick={editProduct ? handleUpdateProduct : handleSaveProduct}>
              {editProduct ? 'Update' : 'Save'}
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    );
  }
