import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const QuickActionsSection = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      id: 'order-food',
      title: 'اطلب طعام',
      titleEn: 'Order Food',
      description: 'اكتشف المطاعم القريبة منك',
      descriptionEn: 'Discover nearby restaurants',
      icon: 'UtensilsCrossed',
      color: 'bg-primary',
      route: '/store-browse-categories',
      gradient: 'from-primary to-primary-600'
    },
    {
      id: 'custom-delivery',
      title: 'توصيل مخصص',
      titleEn: 'Custom Delivery',
      description: 'اطلب توصيل أي شيء تريده',
      descriptionEn: 'Request delivery for anything',
      icon: 'Package',
      color: 'bg-success',
      route: '/custom-delivery-request',
      gradient: 'from-success to-emerald-600'
    },
    {
      id: 'browse-stores',
      title: 'تصفح المتاجر',
      titleEn: 'Browse Stores',
      description: 'استكشف جميع المتاجر المتاحة',
      descriptionEn: 'Explore all available stores',
      icon: 'Store',
      color: 'bg-info',
      route: '/store-browse-categories',
      gradient: 'from-info to-blue-600'
    }
  ];

  const handleActionClick = (route) => {
    navigate(route);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-heading font-bold text-text-primary">
        الإجراءات السريعة
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {quickActions.map((action) => (
          <button
            key={action.id}
            onClick={() => handleActionClick(action.route)}
            className="group bg-surface rounded-xl border border-border p-6 hover:shadow-lg hover:scale-105 transition-all duration-300 text-right focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                <Icon 
                  name={action.icon} 
                  size={24} 
                  className="text-white" 
                />
              </div>
              <Icon 
                name="ArrowLeft" 
                size={20} 
                className="text-text-secondary group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" 
              />
            </div>
            
            <div>
              <h3 className="font-heading font-bold text-text-primary mb-2 group-hover:text-primary transition-colors duration-300">
                {action.title}
              </h3>
              <p className="text-sm text-text-secondary group-hover:text-text-primary transition-colors duration-300">
                {action.description}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Additional Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        <div className="bg-surface rounded-lg border border-border p-4 text-center">
          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
            <Icon name="Clock" size={16} className="text-primary" />
          </div>
          <p className="text-2xl font-bold text-text-primary">15</p>
          <p className="text-xs text-text-secondary">دقيقة متوسط التوصيل</p>
        </div>
        
        <div className="bg-surface rounded-lg border border-border p-4 text-center">
          <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-2">
            <Icon name="Store" size={16} className="text-success" />
          </div>
          <p className="text-2xl font-bold text-text-primary">150+</p>
          <p className="text-xs text-text-secondary">مطعم ومتجر</p>
        </div>
        
        <div className="bg-surface rounded-lg border border-border p-4 text-center">
          <div className="w-8 h-8 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-2">
            <Icon name="Star" size={16} className="text-warning" />
          </div>
          <p className="text-2xl font-bold text-text-primary">4.8</p>
          <p className="text-xs text-text-secondary">تقييم التطبيق</p>
        </div>
        
        <div className="bg-surface rounded-lg border border-border p-4 text-center">
          <div className="w-8 h-8 bg-info/10 rounded-full flex items-center justify-center mx-auto mb-2">
            <Icon name="Users" size={16} className="text-info" />
          </div>
          <p className="text-2xl font-bold text-text-primary">50K+</p>
          <p className="text-xs text-text-secondary">عميل راضي</p>
        </div>
      </div>
    </div>
  );
};

export default QuickActionsSection;