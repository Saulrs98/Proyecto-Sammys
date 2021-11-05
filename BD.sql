-- phpMyAdmin SQL Dump
-- version 4.9.7
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Nov 05, 2021 at 06:43 PM
-- Server version: 5.7.32
-- PHP Version: 7.4.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `bd-sammys`
--

-- --------------------------------------------------------

--
-- Table structure for table `Catálogo`
--

CREATE TABLE `Catálogo` (
  `IdCatalogo` int(11) NOT NULL,
  `Descripcion` varchar(30) NOT NULL,
  `Disponible` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `DireccionResidencia`
--

CREATE TABLE `DireccionResidencia` (
  `IdDireccion` int(11) NOT NULL,
  `Colonia` varchar(30) NOT NULL,
  `Fraccionamiento` varchar(50) NOT NULL,
  `Calle` varchar(30) NOT NULL,
  `CP` int(5) NOT NULL,
  `NumExterior` int(6) NOT NULL,
  `NumInterior` int(6) NOT NULL,
  `Disponible` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `Pedido`
--

CREATE TABLE `Pedido` (
  `IdPedido` int(11) NOT NULL,
  `FechaPedido` date NOT NULL,
  `FechaEntrega` date NOT NULL,
  `Estatus` varchar(10) NOT NULL,
  `CostoTotal` int(10) NOT NULL,
  `Descripcion` varchar(40) NOT NULL,
  `TipoDeEntrega` varchar(10) NOT NULL,
  `IdPromocion` int(11) NOT NULL,
  `IdUsuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `Pedido-Producto`
--

CREATE TABLE `Pedido-Producto` (
  `IdPedido` int(11) NOT NULL,
  `IdProducto` int(11) NOT NULL,
  `CantidadPorProductos` int(11) NOT NULL,
  `PrecioPorProducto` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `Privilegios`
--

CREATE TABLE `Privilegios` (
  `IdPermiso` int(11) NOT NULL,
  `NombrePermiso` varchar(10) NOT NULL,
  `Descripcion` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `Producto`
--

CREATE TABLE `Producto` (
  `IdProducto` int(11) NOT NULL,
  `NombreProducto` varchar(30) NOT NULL,
  `CatalogoProducto` varchar(15) NOT NULL,
  `Precio` int(15) NOT NULL,
  `Talla` varchar(10) NOT NULL,
  `CantidadStock` int(7) NOT NULL,
  `Disponible` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `Promoción`
--

CREATE TABLE `Promoción` (
  `IdPromocion` int(11) NOT NULL,
  `Descripcion` varchar(50) NOT NULL,
  `ImagenPromocion` varchar(100) NOT NULL,
  `TipoDescuento` varchar(3) NOT NULL,
  `FechaInicio` date NOT NULL,
  `FechaFin` date NOT NULL,
  `Disponible` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `Rol`
--

CREATE TABLE `Rol` (
  `IdRol` int(11) NOT NULL,
  `NombreRol` varchar(10) NOT NULL,
  `IdPermiso` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `Usuario`
--

CREATE TABLE `Usuario` (
  `IdUsuario` int(11) NOT NULL,
  `Nombre` varchar(20) NOT NULL,
  `Apellidos` varchar(30) NOT NULL,
  `Género` varchar(10) NOT NULL,
  `Teléfono` varchar(12) NOT NULL,
  `FechaNacimiento` varchar(10) NOT NULL,
  `Contraseña` varchar(10) NOT NULL,
  `IdRol` int(11) NOT NULL,
  `IdDireccion` int(11) NOT NULL,
  `Disponible` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Catálogo`
--
ALTER TABLE `Catálogo`
  ADD PRIMARY KEY (`IdCatalogo`);

--
-- Indexes for table `DireccionResidencia`
--
ALTER TABLE `DireccionResidencia`
  ADD PRIMARY KEY (`IdDireccion`);

--
-- Indexes for table `Pedido`
--
ALTER TABLE `Pedido`
  ADD PRIMARY KEY (`IdPedido`),
  ADD KEY `IdPromocion` (`IdPromocion`),
  ADD KEY `IdUsuario` (`IdUsuario`);

--
-- Indexes for table `Pedido-Producto`
--
ALTER TABLE `Pedido-Producto`
  ADD KEY `IdPedido` (`IdPedido`),
  ADD KEY `IdProducto` (`IdProducto`);

--
-- Indexes for table `Privilegios`
--
ALTER TABLE `Privilegios`
  ADD PRIMARY KEY (`IdPermiso`);

--
-- Indexes for table `Producto`
--
ALTER TABLE `Producto`
  ADD PRIMARY KEY (`IdProducto`);

--
-- Indexes for table `Promoción`
--
ALTER TABLE `Promoción`
  ADD PRIMARY KEY (`IdPromocion`);

--
-- Indexes for table `Rol`
--
ALTER TABLE `Rol`
  ADD PRIMARY KEY (`IdRol`),
  ADD KEY `IdPermiso` (`IdPermiso`);

--
-- Indexes for table `Usuario`
--
ALTER TABLE `Usuario`
  ADD PRIMARY KEY (`IdUsuario`),
  ADD KEY `IdRol` (`IdRol`),
  ADD KEY `IdDireccion` (`IdDireccion`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Catálogo`
--
ALTER TABLE `Catálogo`
  MODIFY `IdCatalogo` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `DireccionResidencia`
--
ALTER TABLE `DireccionResidencia`
  MODIFY `IdDireccion` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Pedido`
--
ALTER TABLE `Pedido`
  MODIFY `IdPedido` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Privilegios`
--
ALTER TABLE `Privilegios`
  MODIFY `IdPermiso` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Producto`
--
ALTER TABLE `Producto`
  MODIFY `IdProducto` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Promoción`
--
ALTER TABLE `Promoción`
  MODIFY `IdPromocion` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Rol`
--
ALTER TABLE `Rol`
  MODIFY `IdRol` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Usuario`
--
ALTER TABLE `Usuario`
  MODIFY `IdUsuario` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Pedido`
--
ALTER TABLE `Pedido`
  ADD CONSTRAINT `pedido_ibfk_1` FOREIGN KEY (`IdPromocion`) REFERENCES `Promoción` (`IdPromocion`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `pedido_ibfk_3` FOREIGN KEY (`IdUsuario`) REFERENCES `Usuario` (`IdUsuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Pedido-Producto`
--
ALTER TABLE `Pedido-Producto`
  ADD CONSTRAINT `pedido-producto_ibfk_1` FOREIGN KEY (`IdProducto`) REFERENCES `Producto` (`IdProducto`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Rol`
--
ALTER TABLE `Rol`
  ADD CONSTRAINT `rol_ibfk_1` FOREIGN KEY (`IdPermiso`) REFERENCES `Privilegios` (`IdPermiso`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Usuario`
--
ALTER TABLE `Usuario`
  ADD CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`IdRol`) REFERENCES `Rol` (`IdRol`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `usuario_ibfk_2` FOREIGN KEY (`IdDireccion`) REFERENCES `DireccionResidencia` (`IdDireccion`) ON DELETE CASCADE ON UPDATE CASCADE;
