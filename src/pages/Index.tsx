import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface FormData {
  lastName: string;
  firstName: string;
  middleName: string;
  birthDate: string;
  phone: string;
  email: string;
  position: string;
  jerseyNumber: string;
}

const Index = () => {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<FormData>({
    lastName: '',
    firstName: '',
    middleName: '',
    birthDate: '',
    phone: '',
    email: '',
    position: '',
    jerseyNumber: ''
  });

  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  const updateField = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (validateCurrentStep()) {
      setDirection('forward');
      setStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const prevStep = () => {
    setDirection('backward');
    setStep(prev => Math.max(prev - 1, 1));
  };

  const validateCurrentStep = (): boolean => {
    switch (step) {
      case 1:
        if (!formData.lastName || !formData.firstName || !formData.birthDate) {
          toast({
            title: "Заполните все поля",
            description: "Необходимо указать фамилию, имя и дату рождения",
            variant: "destructive"
          });
          return false;
        }
        break;
      case 2:
        if (!formData.phone || !formData.email) {
          toast({
            title: "Заполните контакты",
            description: "Необходимо указать телефон и email",
            variant: "destructive"
          });
          return false;
        }
        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
          toast({
            title: "Некорректный email",
            description: "Проверьте правильность email адреса",
            variant: "destructive"
          });
          return false;
        }
        break;
      case 3:
        if (!formData.position || !formData.jerseyNumber) {
          toast({
            title: "Заполните игровую информацию",
            description: "Необходимо указать позицию и номер",
            variant: "destructive"
          });
          return false;
        }
        break;
    }
    return true;
  };

  const handleSubmit = () => {
    toast({
      title: "Регистрация успешна! 🏐",
      description: `Добро пожаловать в команду, ${formData.firstName}!`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-xl animate-fade-in">
        <CardHeader className="text-center space-y-2 pb-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Icon name="Trophy" className="text-primary" size={32} />
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Регистрация волейболиста
            </CardTitle>
          </div>
          <CardDescription className="text-base">
            Шаг {step} из {totalSteps}
          </CardDescription>
          <Progress value={progress} className="h-2 mt-4" />
        </CardHeader>

        <CardContent className="space-y-6">
          {step === 1 && (
            <div className={`space-y-4 ${direction === 'forward' ? 'animate-slide-in-right' : 'animate-slide-in-left'}`}>
              <div className="flex items-center gap-2 mb-4">
                <Icon name="User" className="text-primary" size={24} />
                <h3 className="text-xl font-semibold">Личные данные</h3>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="lastName">Фамилия *</Label>
                <Input
                  id="lastName"
                  placeholder="Иванов"
                  value={formData.lastName}
                  onChange={(e) => updateField('lastName', e.target.value)}
                  className="text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="firstName">Имя *</Label>
                <Input
                  id="firstName"
                  placeholder="Иван"
                  value={formData.firstName}
                  onChange={(e) => updateField('firstName', e.target.value)}
                  className="text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="middleName">Отчество</Label>
                <Input
                  id="middleName"
                  placeholder="Иванович"
                  value={formData.middleName}
                  onChange={(e) => updateField('middleName', e.target.value)}
                  className="text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="birthDate">Дата рождения *</Label>
                <Input
                  id="birthDate"
                  type="date"
                  value={formData.birthDate}
                  onChange={(e) => updateField('birthDate', e.target.value)}
                  className="text-base"
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className={`space-y-4 ${direction === 'forward' ? 'animate-slide-in-right' : 'animate-slide-in-left'}`}>
              <div className="flex items-center gap-2 mb-4">
                <Icon name="Mail" className="text-primary" size={24} />
                <h3 className="text-xl font-semibold">Контактная информация</h3>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Номер телефона *</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+7 (999) 123-45-67"
                  value={formData.phone}
                  onChange={(e) => updateField('phone', e.target.value)}
                  className="text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Электронная почта *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@mail.ru"
                  value={formData.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  className="text-base"
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className={`space-y-4 ${direction === 'forward' ? 'animate-slide-in-right' : 'animate-slide-in-left'}`}>
              <div className="flex items-center gap-2 mb-4">
                <Icon name="Target" className="text-primary" size={24} />
                <h3 className="text-xl font-semibold">Игровая информация</h3>
              </div>

              <div className="space-y-2">
                <Label htmlFor="position">Позиция *</Label>
                <Select value={formData.position} onValueChange={(value) => updateField('position', value)}>
                  <SelectTrigger id="position" className="text-base">
                    <SelectValue placeholder="Выберите позицию" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="setter">Связующий</SelectItem>
                    <SelectItem value="outside">Доигровщик</SelectItem>
                    <SelectItem value="middle">Центральный блокирующий</SelectItem>
                    <SelectItem value="opposite">Диагональный</SelectItem>
                    <SelectItem value="libero">Либеро</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="jerseyNumber">Игровой номер *</Label>
                <Input
                  id="jerseyNumber"
                  type="number"
                  min="1"
                  max="99"
                  placeholder="7"
                  value={formData.jerseyNumber}
                  onChange={(e) => updateField('jerseyNumber', e.target.value)}
                  className="text-base"
                />
              </div>
            </div>
          )}

          {step === 4 && (
            <div className={`space-y-6 ${direction === 'forward' ? 'animate-slide-in-right' : 'animate-slide-in-left'}`}>
              <div className="flex items-center gap-2 mb-4">
                <Icon name="CheckCircle2" className="text-primary" size={24} />
                <h3 className="text-xl font-semibold">Подтверждение данных</h3>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-orange-50 rounded-lg p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">ФИО</p>
                    <p className="font-semibold">{`${formData.lastName} ${formData.firstName} ${formData.middleName}`}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Дата рождения</p>
                    <p className="font-semibold">{new Date(formData.birthDate).toLocaleDateString('ru-RU')}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Телефон</p>
                    <p className="font-semibold">{formData.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-semibold break-all">{formData.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Позиция</p>
                    <p className="font-semibold">
                      {formData.position === 'setter' && 'Связующий'}
                      {formData.position === 'outside' && 'Доигровщик'}
                      {formData.position === 'middle' && 'Центральный блокирующий'}
                      {formData.position === 'opposite' && 'Диагональный'}
                      {formData.position === 'libero' && 'Либеро'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Игровой номер</p>
                    <p className="font-semibold text-2xl text-primary">#{formData.jerseyNumber}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between pt-4">
            {step > 1 && (
              <Button
                variant="outline"
                onClick={prevStep}
                className="gap-2"
              >
                <Icon name="ChevronLeft" size={20} />
                Назад
              </Button>
            )}
            
            <div className="ml-auto">
              {step < totalSteps ? (
                <Button
                  onClick={nextStep}
                  className="gap-2 bg-primary hover:bg-primary/90"
                >
                  Далее
                  <Icon name="ChevronRight" size={20} />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  className="gap-2 bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                >
                  <Icon name="Check" size={20} />
                  Зарегистрироваться
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
