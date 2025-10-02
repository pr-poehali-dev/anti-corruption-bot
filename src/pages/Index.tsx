import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [activeTab, setActiveTab] = useState('knowledge');
  const [question, setQuestion] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const knowledgeBase = [
    {
      id: 'gifts',
      title: 'Подарки и вознаграждения',
      icon: 'Gift',
      items: [
        {
          question: 'Можно ли принимать подарки от партнеров?',
          answer: 'Подарки стоимостью до 3000 рублей можно принимать без согласования. О любых подарках стоимостью свыше 3000 рублей необходимо уведомить руководителя или комплаенс-отдел.'
        },
        {
          question: 'Что делать, если предлагают денежное вознаграждение?',
          answer: 'Любые денежные вознаграждения от партнеров или клиентов запрещены. Необходимо вежливо отказаться и сообщить в отдел комплаенса.'
        }
      ]
    },
    {
      id: 'conflicts',
      title: 'Конфликт интересов',
      icon: 'AlertTriangle',
      items: [
        {
          question: 'Как определить конфликт интересов?',
          answer: 'Конфликт интересов - это ситуация, при которой личная заинтересованность (прямая или косвенная) лица, замещающего должность, замещение которой предусматривает обязанность принимать меры по предотвращению и урегулированию конфликта интересов, влияет или может повлиять на надлежащее, объективное и беспристрастное исполнение им должностных (служебных) обязанностей (осуществление полномочий).'
        },
        {
          question: 'Что делать при выявлении конфликта интересов?',
          answer: 'Необходимо незамедлительно уведомить непосредственного руководителя и комплаенс-отдел в письменной форме. Ситуация будет рассмотрена, и будут предложены меры по урегулированию.'
        }
      ]
    },
    {
      id: 'procurement',
      title: 'Закупки и тендеры',
      icon: 'FileText',
      items: [
        {
          question: 'Какие правила участия в тендерах?',
          answer: 'Все тендеры должны проводиться открыто и прозрачно. Запрещается предоставлять преференции отдельным участникам. Критерии оценки должны быть объективными и документированными.'
        },
        {
          question: 'Можно ли работать с родственниками поставщиков?',
          answer: 'Если у вас есть родственные связи с представителями поставщика, это необходимо раскрыть до начала процедуры закупки. В таком случае вы не должны участвовать в принятии решений.'
        }
      ]
    },
    {
      id: 'prohibitions',
      title: 'Запреты для государственных и муниципальных служащих',
      icon: 'ShieldX',
      items: [
        {
          question: 'Какие основные запреты установлены для госслужащих?',
          answer: 'Государственным и муниципальным служащим запрещается: участвовать на платной основе в деятельности органа управления коммерческой организации; замещать должность в случае избрания или назначения на государственную должность; осуществлять предпринимательскую деятельность; приобретать ценные бумаги, по которым может быть получен доход.'
        },
        {
          question: 'Можно ли госслужащему получать вознаграждения от физических и юридических лиц?',
          answer: 'Государственным и муниципальным служащим запрещается получать в связи с исполнением должностных обязанностей вознаграждения от физических и юридических лиц (подарки, денежное вознаграждение, ссуды, услуги, оплату развлечений, отдыха, транспортных расходов и иные вознаграждения).'
        },
        {
          question: 'Может ли госслужащий выезжать в командировки за счет других лиц?',
          answer: 'Государственным и муниципальным служащим запрещается выезжать в связи с исполнением должностных обязанностей за пределы территории Российской Федерации за счет средств физических и юридических лиц, за исключением служебных командировок, осуществляемых в соответствии с законодательством.'
        }
      ]
    },
    {
      id: 'restrictions',
      title: 'Ограничения для государственных и муниципальных служащих',
      icon: 'ShieldAlert',
      items: [
        {
          question: 'Какие ограничения действуют при трудоустройстве госслужащего?',
          answer: 'Гражданин не может быть принят на государственную или муниципальную службу в случае: признания его недееспособным или ограниченно дееспособным; осуждения к наказанию, исключающему возможность исполнения должностных обязанностей; наличия заболевания, препятствующего поступлению на службу; близкого родства с госслужащим, если замещение должности связано с непосредственной подчиненностью.'
        },
        {
          question: 'Может ли госслужащий заниматься другой оплачиваемой деятельностью?',
          answer: 'Государственный или муниципальный служащий вправе с предварительным уведомлением представителя нанимателя выполнять иную оплачиваемую работу, если это не повлечет за собой конфликт интересов. К такой деятельности относится преподавательская, научная и иная творческая деятельность.'
        },
        {
          question: 'Какие ограничения связаны с владением ценными бумагами?',
          answer: 'Государственный или муниципальный служащий обязан передавать в доверительное управление ценные бумаги, акции (доли участия в уставных капиталах организаций), если владение ими приводит или может привести к конфликту интересов.'
        }
      ]
    },
    {
      id: 'violations',
      title: 'Типичные нарушения и последствия',
      icon: 'AlertCircle',
      items: [
        {
          question: 'Пример нарушения: принятие дорогого подарка',
          answer: 'Государственный служащий принял от представителя коммерческой организации подарок стоимостью 50 000 рублей в связи с юбилеем. Последствия: дисциплинарное взыскание вплоть до увольнения, возможно привлечение к административной или уголовной ответственности в зависимости от обстоятельств.'
        },
        {
          question: 'Пример нарушения: скрытие конфликта интересов',
          answer: 'Сотрудник отдела закупок не сообщил, что его супруга является учредителем компании-участника тендера, и принимал участие в оценке заявок. Последствия: увольнение в связи с утратой доверия, возможное возбуждение уголовного дела по статье "Злоупотребление должностными полномочиями".'
        },
        {
          question: 'Пример нарушения: предпринимательская деятельность',
          answer: 'Муниципальный служащий зарегистрировал на себя ООО и осуществлял предпринимательскую деятельность, не уведомив работодателя. Последствия: увольнение в связи с утратой доверия, взыскание незаконно полученных доходов, административная ответственность.'
        },
        {
          question: 'Пример нарушения: непредставление сведений о доходах',
          answer: 'Государственный служащий не подал декларацию о доходах в установленный срок или указал недостоверные сведения о своих доходах и имуществе. Последствия: дисциплинарная ответственность (замечание, выговор, увольнение), административный штраф от 20 000 до 50 000 рублей.'
        },
        {
          question: 'Пример нарушения: использование служебного положения',
          answer: 'Чиновник использовал свое служебное положение для получения преимуществ при оформлении земельного участка для родственника. Последствия: увольнение в связи с утратой доверия, уголовная ответственность по ст. 285 УК РФ (злоупотребление должностными полномочиями) — штраф до 300 000 рублей или лишение свободы до 4 лет.'
        }
      ]
    },
    {
      id: 'reporting',
      title: 'Сообщение о нарушениях',
      icon: 'Bell',
      items: [
        {
          question: 'Куда сообщить о нарушении?',
          answer: 'Вы можете сообщить о нарушении через горячую линию (8-800-xxx-xx-xx), электронную почту (compliance@company.com) или через форму обращения к специалисту на этом сайте. Анонимность гарантируется.'
        },
        {
          question: 'Будет ли защита от преследования?',
          answer: 'Компания гарантирует защиту сотрудников, добросовестно сообщивших о нарушениях. Любые формы преследования или дискриминации за такие сообщения строго запрещены.'
        }
      ]
    }
  ];

  const handleSubmitQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || !name.trim() || !email.trim()) {
      toast({
        title: 'Ошибка',
        description: 'Пожалуйста, заполните все поля',
        variant: 'destructive',
      });
      return;
    }
    
    toast({
      title: 'Вопрос отправлен',
      description: 'Специалист свяжется с вами в течение 24 часов',
    });
    
    setQuestion('');
    setName('');
    setEmail('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container max-w-4xl mx-auto px-4 py-8 md:py-12">
        <div className="mb-8 md:mb-12 text-center animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-2xl mb-4 shadow-lg">
            <Icon name="Shield" className="text-white" size={32} />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Антикоррупционные стандарты
          </h1>
          <p className="text-gray-600 text-lg">
            База знаний и помощь специалистов по этике и комплаенсу
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 h-auto p-1 bg-white shadow-sm">
            <TabsTrigger 
              value="knowledge" 
              className="data-[state=active]:bg-primary data-[state=active]:text-white py-3 rounded-lg transition-all"
            >
              <Icon name="BookOpen" size={18} className="mr-2" />
              <span className="hidden sm:inline">База знаний</span>
              <span className="sm:hidden">Знания</span>
            </TabsTrigger>
            <TabsTrigger 
              value="question" 
              className="data-[state=active]:bg-primary data-[state=active]:text-white py-3 rounded-lg transition-all"
            >
              <Icon name="MessageCircle" size={18} className="mr-2" />
              <span className="hidden sm:inline">Задать вопрос</span>
              <span className="sm:hidden">Вопрос</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="knowledge" className="space-y-6 animate-fade-in">
            {knowledgeBase.map((category) => (
              <Card key={category.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon name={category.icon} className="text-primary" size={20} />
                    </div>
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {category.items.map((item, idx) => (
                      <AccordionItem key={idx} value={`item-${idx}`} className="border-gray-200">
                        <AccordionTrigger className="text-left hover:text-primary transition-colors py-4">
                          <span className="flex items-start gap-2">
                            <Icon name="HelpCircle" size={18} className="mt-1 flex-shrink-0 text-primary" />
                            <span className="font-medium">{item.question}</span>
                          </span>
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-700 leading-relaxed pl-7 pb-4">
                          {item.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            ))}

            <Card className="border-2 border-primary/20 bg-primary/5 shadow-lg">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
                    <Icon name="Info" className="text-white" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Не нашли ответ?</h3>
                    <p className="text-gray-700 mb-4">
                      Задайте вопрос специалисту по этике и комплаенсу на вкладке "Задать вопрос"
                    </p>
                    <Button 
                      onClick={() => setActiveTab('question')}
                      className="bg-primary hover:bg-primary/90"
                    >
                      Перейти к форме
                      <Icon name="ArrowRight" size={16} className="ml-2" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="question" className="animate-fade-in">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Icon name="MessageCircle" className="text-primary" size={24} />
                  </div>
                  Обращение к специалисту
                </CardTitle>
                <CardDescription className="text-base mt-3">
                  Заполните форму, и наш специалист по этике и комплаенсу ответит вам в течение 24 часов. 
                  Ваше обращение конфиденциально.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitQuestion} className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Icon name="User" size={16} />
                      Ваше имя
                    </label>
                    <Input
                      id="name"
                      placeholder="Иван Иванов"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="h-11"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Icon name="Mail" size={16} />
                      Email для связи
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="ivan@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-11"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="question" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Icon name="FileQuestion" size={16} />
                      Ваш вопрос
                    </label>
                    <Textarea
                      id="question"
                      placeholder="Опишите вашу ситуацию или задайте вопрос..."
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      rows={6}
                      className="resize-none"
                    />
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
                    <Icon name="Lock" size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-blue-900">
                      <p className="font-medium mb-1">Конфиденциальность гарантирована</p>
                      <p className="text-blue-800">
                        Все обращения обрабатываются в соответствии с политикой конфиденциальности. 
                        При необходимости вы можете обратиться анонимно.
                      </p>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full h-12 text-base bg-primary hover:bg-primary/90 shadow-md hover:shadow-lg transition-all"
                  >
                    <Icon name="Send" size={18} className="mr-2" />
                    Отправить вопрос
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card className="mt-6 border-0 shadow-lg bg-gradient-to-r from-gray-50 to-white">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Icon name="Phone" size={20} className="text-primary" />
                  Другие способы связи
                </h3>
                <div className="space-y-3 text-gray-700">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon name="Phone" size={16} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Горячая линия</p>
                      <p className="font-medium">8-800-xxx-xx-xx</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon name="Mail" size={16} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="font-medium">compliance@company.com</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;