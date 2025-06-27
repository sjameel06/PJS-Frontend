import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { ToggleButton } from 'primereact/togglebutton';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const ServiceCategoryTable = () => {
  const [searchValue, setSearchValue] = useState('');
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: 'Emergency Plumbing',
      subCategory: 'Tap/Faucet Replacement, ..',
      price: 'AED 100',
      description: 'Quick and professional replacement of leaking',
      status: true,
    },
    {
      id: 2,
      name: 'Pipe Repairs & Installation',
      subCategory: 'Blocked Drain Clearing, ..',
      price: 'AED 100',
      description: 'Quick and professional replacement of leaking or damaged',
      status: false,
    },
    {
      id: 3,
      name: 'Drain Cleaning & Clogging',
      subCategory: 'Tap/Faucet Replacement',
      price: 'AED 100',
      description: 'Quick and professional replacement of leaking or damaged',
      status: false,
    },
    {
      id: 4,
      name: 'Water Heater Services',
      subCategory: 'Shower Mixer Installation',
      price: 'AED 100',
      description: 'Quick and professional replacement of leaking or damaged',
      status: false,
    },
    {
      id: 5,
      name: 'Bathroom & Kitchen Plumbing',
      subCategory: 'Blocked Drain Clearing',
      price: 'AED 100',
      description: 'Quick and professional replacement of leaking or damaged',
      status: false,
    },
    {
      id: 6,
      name: 'Sewer & Septic Services',
      subCategory: 'Tap/Faucet Replacement',
      price: 'AED 100',
      description: 'Quick and professional replacement of leaking or damaged',
      status: false,
    },
    {
      id: 7,
      name: 'Gas Line Services',
      subCategory: 'Tap/Faucet Replacement',
      price: 'AED 100',
      description: 'Quick and professional replacement of leaking or damaged',
      status: false,
    },
  ]);

  const [filteredCategories, setFilteredCategories] = useState(categories);

  const onSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchValue(value);
    if (!value) {
      setFilteredCategories(categories);
    } else {
      const filtered = categories.filter(item =>
        item.name.toLowerCase().includes(value) ||
        item.subCategory.toLowerCase().includes(value)
      );
      setFilteredCategories(filtered);
    }
  };

  const statusBody = (rowData) => (
    <ToggleButton
      checked={rowData.status}
      onChange={(e) => {
        const updated = categories.map(cat =>
          cat.id === rowData.id ? { ...cat, status: e.value } : cat
        );
        setCategories(updated);
        setFilteredCategories(updated);
      }}
      onLabel=""
      offLabel=""
      onIcon="pi pi-check"
      offIcon="pi pi-times"
      className="p-button-sm"
    />
  );

  const actionBody = (rowData) => (
    <div className="flex gap-2">
      <Button icon="pi pi-pencil" className="p-button-rounded p-button-info p-button-sm" tooltip="Edit" />
      <Button icon="pi pi-eye" className="p-button-rounded p-button-secondary p-button-sm" tooltip="View Subcategories" />
      <Button icon="pi pi-trash" className="p-button-rounded p-button-danger p-button-sm" tooltip="Delete" />
    </div>
  );

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-semibold">All Service Categories</h2>
        <Button label="Add Service Category" icon="pi pi-plus" className="p-button-primary p-button-sm" />
      </div>

      <div className="flex justify-between items-center mb-3 flex-wrap gap-2">
        <span className="p-input-icon-left w-full md:w-1/2">
          <i className="pi pi-search" />
          <InputText
            value={searchValue}
            onChange={onSearch}
            placeholder="Search..."
            className="w-full"
          />
        </span>
        <Button label="Export in CSV" icon="pi pi-file-export" className="p-button-outlined p-button-sm" />
      </div>

      <DataTable
        value={filteredCategories}
        paginator
        rows={5}
        stripedRows
        responsiveLayout="scroll"
        className="p-datatable-sm"
      >
        <Column field="id" header="#" style={{ width: '4em' }} />
        <Column field="name" header="Category Name" />
        <Column field="subCategory" header="Sub-Category" />
        <Column field="price" header="Default Price" />
        <Column field="description" header="Description" />
        <Column header="Status" body={statusBody} style={{ textAlign: 'center', width: '6em' }} />
        <Column header="Action" body={actionBody} style={{ textAlign: 'center', width: '10em' }} />
      </DataTable>
    </div>
  );
};

export default ServiceCategoryTable;
