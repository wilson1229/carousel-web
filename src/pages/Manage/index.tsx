import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { ExclamationCircleOutlined } from '@ant-design/icons';
import {
  Space,
  Table,
  Modal,
  Form,
  Input,
  Button,
  Divider,
  message
} from 'antd';
import type { ColumnsType } from 'antd/es/table';

import {
  getCarouselList,
  deleteCarouselItem,
  addCarouselItem,
  updateCarouselItem
} from '../../service';
import { CarouselItemData } from '../../components/Carousel/CarouselItem';

import './index.scss';

/* use carouselId: 1 as a default carousel id */

interface FieldType {
  id: number;
  title: string;
  buttonText: string;
  description: string;
  backgroundImage: {
    link: string;
    id: number;
  };
}

const initFormvalue = {
  title: '',
  buttonText: '',
  description: '',
  backgroundImage: {
    link: ''
  }
};

const Manage = () => {
  const [dataList, setDataList] = useState([]);

  const { carouselId } = useParams();
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [currentUpdateItem, setCurrentUpdateItem] =
    useState<CarouselItemData | null>(null);
  const [form] = Form.useForm();
  const handleUpdate = (item: CarouselItemData | null) => () => {
    setCurrentUpdateItem(item);
    form.setFieldsValue({
      ...item
    });
  };
  const handleCreate = () => {
    setOpenCreateModal(true);
    form.setFieldsValue(initFormvalue);
  };
  const handleDelete = (item: CarouselItemData) => () => {
    Modal.confirm({
      title: 'Confirm',
      icon: <ExclamationCircleOutlined />,
      content: 'Are you sure you want to remove this item?',
      onOk: async () => {
        const res = await deleteCarouselItem(item.id);
        handleResult(res);
      }
    });
  };
  const columns: ColumnsType<CarouselItemData> = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: 'Image',
      key: 'image',
      width: 300,
      className: 'table-bk-image',
      render: (_, { backgroundImage }) => (
        <div className="image-info">
          <img src={backgroundImage.link} alt="" />
          <p>{backgroundImage.link}</p>
        </div>
      )
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title'
    },
    {
      title: 'ButtonText',
      dataIndex: 'buttonText',
      key: 'buttonText'
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description'
    },

    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={handleUpdate(record)}>Update</a>
          <a onClick={handleDelete(record)}>Delete</a>
        </Space>
      )
    }
  ];
  useEffect(() => {
    loadData();
  }, []);
  const loadData = () => {
    getCarouselList(carouselId).then(res => {
      setDataList(res.data);
    });
  };
  const handleResult = (
    res: number,
    successMsg = 'Operation success!',
    errMsg = 'Something is wrong!'
  ) => {
    if (res) {
      loadData();
      message.success(successMsg);
    } else {
      message.error(errMsg);
    }
  };
  return (
    <div className="manage-wrapper">
      <Button onClick={handleCreate} type="primary">
        Add Item
      </Button>
      <Divider></Divider>
      <Table
        columns={columns}
        dataSource={dataList.map((item: any) => {
          return {
            ...item,
            key: item.id
          };
        })}
      />
      <Modal
        title={currentUpdateItem ? 'Update' : 'Create'}
        open={Boolean(currentUpdateItem) || openCreateModal}
        onOk={() => {
          form.submit();
        }}
        onCancel={() => {
          setCurrentUpdateItem(null);
          setOpenCreateModal(false);
        }}
      >
        <Form
          name="carousel-item-form"
          form={form}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 12 }}
          style={{ maxWidth: 500 }}
          initialValues={currentUpdateItem || {}}
          onFinish={async (values: any) => {
            let res = 0;
            const newValue = {
              title: values.title,
              description: values.description,
              buttonText: values.buttonText,
              backgroundImageLink: values.backgroundImage.link
            };

            if (currentUpdateItem) {
              // edite mode
              res = await updateCarouselItem(currentUpdateItem.id, newValue);
            } else {
              // create mode
              res = await addCarouselItem(carouselId, newValue);
            }
            handleResult(res);
            setCurrentUpdateItem(null);
            setOpenCreateModal(false);
          }}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="title"
            name="title"
            rules={[{ required: true, message: 'Please input title!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="description"
            name="description"
            rules={[{ required: true, message: 'Please input description!' }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item<FieldType>
            label="buttonText"
            name="buttonText"
            rules={[{ required: true, message: 'Please input buttonText!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label="link"
            name={['backgroundImage', 'link']}
            rules={[{ required: true, message: 'Please input link!' }]}
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Manage;
