import React, { Component } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ContextMenu } from 'primereact/contextmenu';
import { Toast } from 'primereact/toast';

export default class DataTableContextMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      selectedProduct: null,
    };

    this.menuModel = [
      {
        label: 'View',
        icon: 'pi pi-fw pi-search',
        command: () => this.viewProduct(this.state.selectedProduct),
      },
      {
        label: 'Delete',
        icon: 'pi pi-fw pi-times',
        command: () => this.deleteProduct(this.state.selectedProduct),
      },
    ];

    this.productService = new ProductService();
    this.viewProduct = this.viewProduct.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
    this.priceBodyTemplate = this.priceBodyTemplate.bind(this);
  }

  componentDidMount() {
    this.productService
      .getProductsSmall()
      .then((data) => this.setState({ products: data }));
  }

  viewProduct(product) {
    this.toast.show({
      severity: 'info',
      summary: 'Product Selected',
      detail: product.name,
    });
  }

  deleteProduct(product) {
    let products = [...this.state.products];
    products = products.filter((p) => p.id !== product.id);

    this.toast.show({
      severity: 'error',
      summary: 'Product Deleted',
      detail: product.name,
    });
    this.setState({ products });
  }

  formatCurrency(value) {
    return value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
  }

  priceBodyTemplate(rowData) {
    return this.formatCurrency(rowData.price);
  }

  render() {
    return (
      <View>
        <Toast
          ref={(el) => {
            this.toast = el;
          }}
        ></Toast>

        <ContextMenu
          model={this.menuModel}
          ref={(el) => (this.cm = el)}
          onHide={() => this.setState({ selectedProduct: null })}
        />

        <View className="card">
          <DataTable
            value={this.state.products}
            contextMenuSelection={this.state.selectedProduct}
            onContextMenuSelectionChange={(e) =>
              this.setState({ selectedProduct: e.value })
            }
            onContextMenu={(e) => this.cm.show(e.originalEvent)}
            responsiveLayout="scroll"
          >
            <Column field="code" header="Code"></Column>
            <Column field="name" header="Name"></Column>
            <Column field="category" header="Category"></Column>
            <Column
              field="price"
              header="Price"
              body={this.priceBodyTemplate}
            />
          </DataTable>
        </View>
      </View>
    );
  }
}
