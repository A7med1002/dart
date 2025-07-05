import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentOrdersSection = () => {
  const navigate = useNavigate();

  const recentOrders = [
    {
      id: "ORD-2024-001",
      storeName: "مطعم الشام الأصيل",
      storeNameEn: "Authentic Sham Restaurant",
      items: ["شاورما دجاج", "فلافل", "حمص"],
      itemsEn: ["Chicken Shawarma", "Falafel", "Hummus"],
      status: "delivered",
      statusAr: "تم التوصيل",
      totalAmount: 45,
      orderTime: "2024-01-15T14:30:00Z",
      deliveryTime: "2024-01-15T15:15:00Z",
      rating: null
    },
    {
      id: "ORD-2024-002",
      storeName: "مقهى القهوة الذهبية",
      storeNameEn: "Golden Coffee Cafe",
      items: ["قهوة عربية", "كنافة", "معمول"],
      itemsEn: ["Arabic Coffee", "Kunafa", "Maamoul"],
      status: "on_way",
      statusAr: "في الطريق",
      totalAmount: 32,
      orderTime: "2024-01-15T16:45:00Z",
      estimatedDelivery: "2024-01-15T17:30:00Z",
      deliveryAgent: {
        name: "أحمد محمد",
        nameEn: "Ahmed Mohammed",
        phone: "+966501234567",
        rating: 4.8
      }
    },
    {
      id: "ORD-2024-003",
      storeName: "مطعم البحر الأزرق",
      storeNameEn: "Blue Sea Restaurant",
      items: ["سمك مشوي", "أرز صيادية", "سلطة فتوش"],
      itemsEn: ["Grilled Fish", "Sayadia Rice", "Fattoush Salad"],
      status: "preparing",
      statusAr: "قيد التحضير",
      totalAmount: 78,
      orderTime: "2024-01-15T18:20:00Z",
      estimatedDelivery: "2024-01-15T19:45:00Z"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'text-success bg-success/10';
      case 'on_way':
        return 'text-primary bg-primary/10';
      case 'preparing':
        return 'text-warning bg-warning/10';
      case 'cancelled':
        return 'text-error bg-error/10';
      default:
        return 'text-text-secondary bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered':
        return 'CheckCircle';
      case 'on_way':
        return 'Truck';
      case 'preparing':
        return 'Clock';
      case 'cancelled':
        return 'XCircle';
      default:
        return 'Package';
    }
  };

  const handleTrackOrder = (orderId) => {
    // In real app, this would navigate to order tracking page
    console.log('Tracking order:', orderId);
  };

  const handleReorder = (orderId) => {
    navigate('/store-menu-product-catalog');
  };

  const handleRateOrder = (orderId) => {
    // In real app, this would open rating modal
    console.log('Rating order:', orderId);
  };

  if (recentOrders.length === 0) {
    return (
      <div className="bg-surface rounded-lg p-6 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Package" size={24} className="text-text-secondary" />
        </div>
        <h3 className="font-heading font-semibold text-text-primary mb-2">
          لا توجد طلبات حديثة
        </h3>
        <p className="text-text-secondary mb-4">
          ابدأ بطلب وجبتك المفضلة الآن
        </p>
        <Button
          variant="primary"
          onClick={() => navigate('/store-browse-categories')}
          iconName="Plus"
          iconPosition="left"
        >
          اطلب الآن
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-heading font-bold text-text-primary">
          الطلبات الأخيرة
        </h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/order-history')}
          iconName="ArrowLeft"
          iconPosition="right"
        >
          عرض الكل
        </Button>
      </div>

      <div className="space-y-3">
        {recentOrders.map((order) => (
          <div
            key={order.id}
            className="bg-surface rounded-lg border border-border p-4 hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="font-semibold text-text-primary">
                    {order.storeName}
                  </h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                    <Icon name={getStatusIcon(order.status)} size={12} className="inline mr-1" />
                    {order.statusAr}
                  </span>
                </div>
                <p className="text-sm text-text-secondary mb-2">
                  رقم الطلب: {order.id}
                </p>
                <div className="flex flex-wrap gap-1 mb-2">
                  {order.items.slice(0, 3).map((item, index) => (
                    <span
                      key={index}
                      className="text-xs bg-gray-100 text-text-secondary px-2 py-1 rounded"
                    >
                      {item}
                    </span>
                  ))}
                  {order.items.length > 3 && (
                    <span className="text-xs text-text-secondary">
                      +{order.items.length - 3} المزيد
                    </span>
                  )}
                </div>
              </div>
              <div className="text-left">
                <p className="font-bold text-primary text-lg">
                  {order.totalAmount} ر.س
                </p>
                <p className="text-xs text-text-secondary">
                  {new Date(order.orderTime).toLocaleTimeString('ar-SA', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>

            {order.status === 'on_way' && order.deliveryAgent && (
              <div className="bg-primary/5 rounded-lg p-3 mb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <Icon name="User" size={16} className="text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-text-primary text-sm">
                        {order.deliveryAgent.name}
                      </p>
                      <div className="flex items-center space-x-1">
                        <Icon name="Star" size={12} className="text-warning fill-current" />
                        <span className="text-xs text-text-secondary">
                          {order.deliveryAgent.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="xs"
                    iconName="Phone"
                    iconPosition="left"
                  >
                    اتصال
                  </Button>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {order.status === 'delivered' && !order.rating && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleRateOrder(order.id)}
                    iconName="Star"
                    iconPosition="left"
                  >
                    تقييم
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleReorder(order.id)}
                  iconName="RotateCcw"
                  iconPosition="left"
                >
                  إعادة الطلب
                </Button>
              </div>
              
              {(order.status === 'preparing' || order.status === 'on_way') && (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleTrackOrder(order.id)}
                  iconName="MapPin"
                  iconPosition="left"
                >
                  تتبع الطلب
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentOrdersSection;