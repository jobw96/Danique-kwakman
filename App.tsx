
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Layout } from './components/Layout';
import { Button } from './components/Button';
import { Section } from './components/Section';
import { Plus, Minus, Star, Check, ArrowRight, Play, Download, Mail, MapPin, Phone, GraduationCap, Heart, Quote, ArrowUpRight, Sparkles, Activity } from 'lucide-react';
import { ServiceItem, Testimonial, FaqItem, Stat } from './types';
import { PageTransition, FadeIn, ParallaxImage, StaggerContainer } from './components/Animations';
import { Input, Label, ButtonShadcn, Checkbox, Textarea } from './components/ui';

// --- Data Constants ---

const TREATMENTS = [
    {
        id: 'glowup',
        title: "1:1 Glow Up Traject",
        description: "Voor de vrouw die klaar is om de regie over haar gezondheid terug te pakken en weer wil stralen van binnenuit.",
        image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 'darmtraject',
        title: "1:1 Darmtraject Therapie",
        description: "Heb jij last van een opgeblazen buik, krampen of een onregelmatige stoelgang? Ontdek de oorzaak en herstel je darmflora.",
        image: "https://images.unsplash.com/photo-1544367563-121910aa662f?auto=format&fit=crop&w=800&q=80"
    }
];

const SERVICES: ServiceItem[] = [
  {
    id: 'hormonal',
    title: 'Hormonale Balans',
    description: 'Herstel je natuurlijke cyclus en energieniveau door de oorzaak van disbalans aan te pakken. Ik kijk naar voeding, stressfactoren en supplementen om je hormonen weer in het gareel te krijgen.',
    image: 'https://images.unsplash.com/photo-1520206183501-b80df61043c2?auto=format&fit=crop&w=800&q=80' 
  },
  {
    id: 'gut',
    title: 'Darmgezondheid',
    description: 'Een gezonde darm is de basis van een sterk immuunsysteem en een heldere geest. Ik help bij PDS, intoleranties en een opgeblazen gevoel met gerichte protocollen.',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=800&q=80' 
  },
  {
    id: 'energy',
    title: 'Energie & Vitaliteit',
    description: 'Ben je constant moe? Ik onderzoek tekorten op celniveau en maak een plan om je mitochondriën (energiefabriekjes) weer optimaal te laten werken.',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80' 
  },
  {
    id: 'prevention',
    title: 'Preventieve Zorg',
    description: 'Wacht niet tot je klachten hebt. Met DNA-analyse en bloedonderzoek breng ik je gezondheidsrisico\'s in kaart en optimaliseer ik je levensduur.',
    image: 'https://images.unsplash.com/photo-1544367563-121910aa662f?auto=format&fit=crop&w=800&q=80' 
  },
];

const STATS: Stat[] = [
  { value: '8', label: 'Jaren ervaring', description: 'In klinische psycho-neuro-immunologie.' },
  { value: '1.2k+', label: 'Cliënten geholpen', description: 'Succesvolle trajecten afgerond.' },
  { value: '30', label: 'Certificaten', description: 'Continue bijscholing in orthomoleculaire wetenschap.' },
  { value: '100%', label: 'Maatwerk', description: 'Geen standaard protocollen, maar maatwerk.' },
];

const TESTIMONIALS: Testimonial[] = [
  { id: '1', name: 'Sophie de Vries', text: 'Na jarenlang vage klachten eindelijk een therapeut die naar de oorzaak keek. Ik heb in tijden niet zoveel energie gehad.', rating: 5, image: 'https://randomuser.me/api/portraits/women/44.jpg' },
  { id: '2', name: 'Mark Jansen', text: 'De aanpak is wetenschappelijk onderbouwd maar wordt heel praktisch en begrijpelijk uitgelegd. Een echte aanrader.', rating: 5, image: 'https://randomuser.me/api/portraits/men/32.jpg' },
  { id: '3', name: 'Elena Visser', text: 'Mijn huidklachten zijn verdwenen door puur mijn voeding aan te passen volgens het plan. Ongelofelijk blij mee.', rating: 5, image: 'https://randomuser.me/api/portraits/women/68.jpg' },
];

const FAQ: FaqItem[] = [
  { question: 'Worden consulten vergoed?', answer: 'Ja, als je aanvullend verzekerd bent, wordt orthomoleculaire therapie vaak (gedeeltelijk) vergoed vanuit de alternatieve geneeswijzen.' },
  { question: 'Heb ik een verwijzing nodig?', answer: 'Nee, je kunt zonder verwijzing van de huisarts een afspraak maken. Ik werk wel graag samen met reguliere zorgverleners.' },
  { question: 'Hoe lang duurt een traject?', answer: 'Gemiddeld zie ik cliënten 3 tot 5 keer over een periode van 4 tot 6 maanden, afhankelijk van de complexiteit van de klachten.' },
  { question: 'Kan ik ook online afspreken?', answer: 'Zeker. Videoconsulten zijn mogelijk en net zo effectief als afspraken op de praktijk.' },
];

const STEPS = [
  {
    id: 1,
    title: "Stap 1: Persoonlijke Kennismaking",
    description: "Ik start met een warm en open intakegesprek. Hier luister ik naar jouw verhaal, gezondheidsklachten en wensen. Met gerichte vragen en eventueel aanvullende tests krijg ik een helder beeld van jouw unieke situatie. Dit is het begin van jouw reis naar vitaliteit!",
    image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    title: "Stap 2: Jouw Plan, Jouw Doelen",
    description: "Ik ontwerp een op maat gemaakt behandelplan, gebaseerd op orthomoleculaire principes. Denk aan optimale voeding, de juiste supplementen en praktische leefstijladviezen die perfect bij jou passen. Samen stellen we heldere, haalbare doelen die jou motiveren om het beste uit jezelf te halen.",
    image: "https://images.unsplash.com/photo-1520116468816-95b69f847357?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    title: "Stap 3: Check-up Tussendoor",
    description: "Ik plan een tussentijdse check-up om jouw voortgang te monitoren. Hoe voel je je? Wat gaat goed en waar kunnen we bijsturen? Deze persoonlijke evaluatie zorgt ervoor dat jouw plan altijd aansluit bij jouw behoeften en je op koers blijft naar je doelen.",
    image: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    title: "Stap 4: Resultaten Vieren & Bijsturen",
    description: "In vervolgconsulten bespreek ik jouw successen en resultaten. Voel je je energieker? Slaap je beter? Samen vieren we jouw vooruitgang en finetunen we het plan om jouw doelen te blijven bereiken. Ik ben er om je te inspireren en te ondersteunen, elke stap van de weg!",
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=800&q=80"
  }
];

// --- Sub Components ---

const SectionTag = ({ text }: { text: string }) => (
  <div className="inline-block bg-[#9CAAC6] text-white text-xs px-4 py-1.5 rounded-full mb-6 font-medium shadow-sm tracking-wide">
    {text}
  </div>
);

const ServiceAccordion = () => {
  const [activeId, setActiveId] = useState<string>(SERVICES[0].id);
  const activeService = SERVICES.find(s => s.id === activeId) || SERVICES[0];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
      <div className="h-[400px] lg:h-[600px] rounded-2xl overflow-hidden shadow-md transition-all duration-500">
        <ParallaxImage 
           key={activeService.id}
           src={activeService.image} 
           alt={activeService.title} 
           className="w-full h-full"
        />
      </div>

      <div className="flex flex-col justify-center">
        {SERVICES.map((service) => (
          <div key={service.id} className="border-b border-[#D8CCAB]/30 last:border-none">
            <button 
              onClick={() => setActiveId(service.id)}
              className="w-full py-6 flex justify-between items-center text-left group focus:outline-none"
            >
              <span className={`font-serif text-2xl md:text-3xl transition-colors duration-300 ${activeId === service.id ? 'text-[#1D1D1B]' : 'text-[#757575] group-hover:text-[#1D1D1B]'}`}>
                {service.title}
              </span>
              {activeId === service.id ? <Minus className="w-5 h-5 text-[#1D1D1B]" /> : <Plus className="w-5 h-5 text-[#D8CCAB]" />}
            </button>
            
            <div 
              className={`overflow-hidden transition-all duration-500 ease-in-out ${activeId === service.id ? 'max-h-48 opacity-100 mb-6' : 'max-h-0 opacity-0'}`}
            >
              <p className="text-[#757575] leading-relaxed pr-8">
                {service.description}
              </p>
              <div className="mt-4">
                <button className="text-sm font-medium border-b border-[#1D1D1B] pb-0.5 text-[#1D1D1B] hover:text-[#757575] hover:border-[#757575] transition-colors">
                  Lees meer over {service.title}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const FaqAccordion = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="w-full max-w-3xl mx-auto">
      {FAQ.map((item, idx) => (
        <div key={idx} className="border-b border-[#D8CCAB]/30 mb-4 last:mb-0">
          <button 
            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            className="w-full py-6 flex justify-between items-center text-left focus:outline-none"
          >
            <span className="text-lg font-medium text-[#1D1D1B]">{item.question}</span>
            <span className={`transform transition-transform duration-300 ${openIndex === idx ? 'rotate-45' : 'rotate-0'}`}>
              <Plus className="w-5 h-5 text-[#757575]" />
            </span>
          </button>
          <div className={`overflow-hidden transition-all duration-300 ${openIndex === idx ? 'max-h-32 opacity-100 pb-6' : 'max-h-0 opacity-0'}`}>
            <p className="text-[#757575]">{item.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

const TreatmentsSection = ({ onNavigate }: { onNavigate: (page: string) => void }) => {
  return (
    <Section className="bg-[#FCF9F2]">
      <div className="text-center mb-16">
        <FadeIn>
          <SectionTag text="Aanbod" />
          <h2 className="font-serif text-4xl md:text-5xl text-[#1D1D1B] mb-4">Behandelingen</h2>
          <p className="text-[#757575]">Kies het traject dat bij jou past</p>
        </FadeIn>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
         {TREATMENTS.map((treatment, index) => (
            <FadeIn 
              key={treatment.id} 
              delay={index * 0.2} 
              className="group cursor-pointer h-full"
            >
                <div 
                  onClick={() => onNavigate(treatment.id)}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#D8CCAB]/30 hover:shadow-xl hover:border-[#9CAAC6]/30 transition-all duration-500 hover:-translate-y-2 h-full flex flex-col"
                >
                   <div className="h-80 overflow-hidden relative">
                      <ParallaxImage src={treatment.image} alt={treatment.title} className="w-full h-full" />
                      <div className="absolute inset-0 bg-[#1D1D1B]/0 group-hover:bg-[#1D1D1B]/10 transition-colors duration-500"></div>
                   </div>
                   <div className="p-8 flex flex-col flex-grow">
                      <h3 className="font-serif text-2xl text-[#1D1D1B] mb-4 group-hover:text-[#9CAAC6] transition-colors">{treatment.title}</h3>
                      <p className="text-[#757575] mb-8 leading-relaxed flex-grow">{treatment.description}</p>
                      <div className="flex items-center text-[#9CAAC6] font-medium group-hover:translate-x-2 transition-transform mt-auto">
                         Bekijk traject <ArrowRight className="w-4 h-4 ml-2" />
                      </div>
                   </div>
                </div>
            </FadeIn>
         ))}
      </div>
    </Section>
  )
}

const StepsSection = () => {
  return (
    <Section className="bg-[#FCF9F2] relative overflow-hidden">
       <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
             <FadeIn>
                <SectionTag text="Werkwijze" />
                <h2 className="font-serif text-4xl md:text-5xl mb-6 text-[#1D1D1B]">Gezonder en energieker in vier stappen</h2>
                <p className="text-[#757575] max-w-2xl mx-auto leading-relaxed">
                  Wil jij bruisen van energie en je gezondheid naar een hoger niveau tillen? Als orthomoleculair therapeut begeleid ik je met een persoonlijk en krachtig 4-stappenplan naar een gezonder, gelukkiger leven!
                </p>
             </FadeIn>
          </div>

          <div className="relative">
             {/* Central Line (Desktop) */}
             <motion.div 
                className="hidden lg:block absolute left-1/2 top-0 w-px bg-[#D8CCAB] -translate-x-1/2"
                initial={{ height: 0 }}
                whileInView={{ height: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
             />

             <div className="flex flex-col gap-24">
                {STEPS.map((step, index) => (
                  <div key={step.id} className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-24 ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                      
                      {/* Image Side */}
                      <FadeIn 
                        direction={index % 2 === 0 ? 'left' : 'right'} 
                        className="w-full lg:w-1/2 relative"
                      >
                          <div className="relative h-80 rounded-3xl overflow-hidden shadow-md group border-4 border-white">
                             <ParallaxImage src={step.image} alt={`Stap ${step.id}`} className="w-full h-full" />
                             <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500"></div>
                             <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <span className="font-serif text-9xl font-bold text-white/90 drop-shadow-lg select-none transform translate-y-2">{step.id}</span>
                             </div>
                          </div>
                          
                          {/* Timeline dot */}
                          <motion.div 
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.3 }}
                            className={`hidden lg:flex absolute top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full items-center justify-center border border-[#D8CCAB] z-10 shadow-sm ${index % 2 !== 0 ? '-right-[3.5rem]' : '-left-[3.5rem]'}`}
                          >
                              <div className="w-4 h-4 bg-[#1D1D1B] rounded-full"></div>
                          </motion.div>
                      </FadeIn>

                      {/* Text Side */}
                      <FadeIn 
                        direction={index % 2 === 0 ? 'right' : 'left'} 
                        delay={0.2}
                        className="w-full lg:w-1/2 text-center lg:text-left"
                      >
                         <h3 className="font-serif text-2xl md:text-3xl mb-4 text-[#1D1D1B]">{step.title}</h3>
                         <p className="text-[#757575] leading-relaxed">{step.description}</p>
                      </FadeIn>

                  </div>
                ))}
             </div>
          </div>
       </div>
    </Section>
  );
};

// --- Page Components ---

const GlowUpPage = ({ onNavigate }: { onNavigate: (page: string) => void }) => (
  <PageTransition>
    <Section className="pt-32 md:pt-40 pb-20 bg-[#FCF9F2]">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-16 mb-20">
          <div className="lg:w-1/2">
            <FadeIn>
              <SectionTag text="Exclusief Traject" />
              <h1 className="font-serif text-5xl lg:text-6xl text-[#1D1D1B] mb-6 leading-tight">1:1 Glow Up Traject</h1>
              <p className="text-lg text-[#757575] leading-relaxed mb-8">
                Voor de vrouw die klaar is om de regie over haar gezondheid terug te pakken. 
                Geen snelle fixes, maar een duurzame transformatie van binnenuit.
              </p>
              <Button onClick={() => onNavigate('contact')}>Start jouw Glow Up</Button>
            </FadeIn>
          </div>
          <div className="lg:w-1/2">
             <FadeIn delay={0.2} className="relative rounded-[2rem] overflow-hidden shadow-xl aspect-[4/5]">
                <ParallaxImage 
                  src="https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=80" 
                  alt="Glow Up" 
                  className="w-full h-full" 
                />
             </FadeIn>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
           {[
             { icon: Sparkles, title: "Hormonale Balans", desc: "We herstellen je natuurlijke cyclus en pakken PMS klachten bij de wortel aan." },
             { icon: Activity, title: "Energie Boost", desc: "Van vermoeid opstaan naar bruisen van energie, de hele dag door." },
             { icon: Heart, title: "Stralende Huid", desc: "Een zuivere huid komt van binnenuit. We pakken de interne oorzaken aan." }
           ].map((item, i) => (
             <FadeIn key={i} delay={i * 0.1} className="bg-white p-8 rounded-2xl shadow-sm border border-[#D8CCAB]/30">
                <div className="w-12 h-12 bg-[#FCF9F2] rounded-full flex items-center justify-center text-[#9CAAC6] mb-6">
                  <item.icon size={24} />
                </div>
                <h3 className="font-serif text-xl text-[#1D1D1B] mb-3">{item.title}</h3>
                <p className="text-[#757575]">{item.desc}</p>
             </FadeIn>
           ))}
        </div>
      </div>
    </Section>
  </PageTransition>
);

const DarmTrajectPage = ({ onNavigate }: { onNavigate: (page: string) => void }) => (
  <PageTransition>
    <Section className="pt-32 md:pt-40 pb-20 bg-[#FCF9F2]">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-16 mb-20">
          <div className="lg:w-1/2">
            <FadeIn>
              <SectionTag text="Specialisatie" />
              <h1 className="font-serif text-5xl lg:text-6xl text-[#1D1D1B] mb-6 leading-tight">1:1 Darmtraject Therapie</h1>
              <p className="text-lg text-[#757575] leading-relaxed mb-8">
                Heb jij last van een opgeblazen buik, krampen of een onregelmatige stoelgang? 
                Een gezonde darm is de basis van je algehele gezondheid.
              </p>
              <Button onClick={() => onNavigate('contact')}>Herstel je darmen</Button>
            </FadeIn>
          </div>
          <div className="lg:w-1/2">
             <FadeIn delay={0.2} className="relative rounded-[2rem] overflow-hidden shadow-xl aspect-[4/5]">
                <ParallaxImage 
                  src="https://images.unsplash.com/photo-1544367563-121910aa662f?auto=format&fit=crop&w=800&q=80" 
                  alt="Darmtherapie" 
                  className="w-full h-full" 
                />
             </FadeIn>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-[#D8CCAB]/30">
           <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl text-[#1D1D1B] mb-4">Hoe ziet het traject eruit?</h2>
              <p className="text-[#757575]">We gaan grondig te werk om de oorzaak te vinden.</p>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex gap-4">
                 <div className="w-8 h-8 rounded-full bg-[#9CAAC6] text-white flex items-center justify-center font-serif font-bold shrink-0">1</div>
                 <div>
                    <h3 className="font-serif text-xl text-[#1D1D1B] mb-2">Uitgebreide Anamnese</h3>
                    <p className="text-[#757575]">We brengen je klachten, voeding en leefstijl gedetailleerd in kaart.</p>
                 </div>
              </div>
              <div className="flex gap-4">
                 <div className="w-8 h-8 rounded-full bg-[#9CAAC6] text-white flex items-center justify-center font-serif font-bold shrink-0">2</div>
                 <div>
                    <h3 className="font-serif text-xl text-[#1D1D1B] mb-2">EMB Bloedtest & Ontlastingstest</h3>
                    <p className="text-[#757575]">Meten is weten. We onderzoeken ontstekingen, intoleranties en darmflora.</p>
                 </div>
              </div>
              <div className="flex gap-4">
                 <div className="w-8 h-8 rounded-full bg-[#9CAAC6] text-white flex items-center justify-center font-serif font-bold shrink-0">3</div>
                 <div>
                    <h3 className="font-serif text-xl text-[#1D1D1B] mb-2">Persoonlijk Behandelplan</h3>
                    <p className="text-[#757575]">Een plan op maat met voeding, supplementen en leefstijladvies.</p>
                 </div>
              </div>
              <div className="flex gap-4">
                 <div className="w-8 h-8 rounded-full bg-[#9CAAC6] text-white flex items-center justify-center font-serif font-bold shrink-0">4</div>
                 <div>
                    <h3 className="font-serif text-xl text-[#1D1D1B] mb-2">Begeleiding & Resultaat</h3>
                    <p className="text-[#757575]">Intensieve begeleiding om te zorgen dat je darmen rustig worden en herstellen.</p>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </Section>
  </PageTransition>
);

const AboutPage = ({ onNavigate }: { onNavigate: (page: string) => void }) => (
  <PageTransition>
    <Section className="bg-[#FCF9F2] overflow-hidden pt-32 pb-16 md:pt-40 md:pb-20">
      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-16">
         <div className="lg:w-5/12 relative z-10">
            <FadeIn>
                <SectionTag text="Orthomoleculair Therapeut" />
                <h1 className="font-serif text-5xl lg:text-7xl mb-8 text-[#1D1D1B] leading-[1.1]">
                   Ik ben <span className="text-[#1D1D1B] italic">Danique</span>
                </h1>
                <div className="text-lg text-[#757575] leading-relaxed space-y-6 font-light">
                   <p>
                     Mijn passie voor gezondheid is ontstaan toen ik startte met mijn opleiding voor verpleegkunde. Ik heb patiënten mogen begeleiden en verzorgen in goede en slechte tijden. Een heel mooi vak!
                   </p>
                   <p>
                     Zelf ervaarde ik vanaf mijn tiener jaren al verschillende klachten waar ik maar niet vanaf kon komen. Klachten als acne, onregelmatige menstruaties, moodswings, vermoeidheid en darmklachten.
                   </p>
                </div>
                <div className="mt-10">
                   <img src="https://upload.wikimedia.org/wikipedia/commons/e/e4/Signature_sample.svg" alt="Signature" className="h-12 opacity-40" />
                </div>
            </FadeIn>
         </div>
         <div className="lg:w-7/12 relative">
             <FadeIn delay={0.2} className="relative">
                <div className="aspect-[4/5] lg:aspect-[3/4] rounded-tr-[100px] rounded-bl-[100px] rounded-tl-3xl rounded-br-3xl overflow-hidden shadow-md">
                   <ParallaxImage 
                     src="https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=80" 
                     alt="Danique" 
                     className="w-full h-full" 
                   />
                </div>
                {/* Decor Elements */}
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#9CAAC6]/10 rounded-full -z-10 blur-2xl"></div>
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#D8CCAB]/50 rounded-full -z-10"></div>
             </FadeIn>
         </div>
      </div>
    </Section>

    <Section className="bg-white relative">
       <div className="max-w-4xl mx-auto">
           <FadeIn>
               <div className="flex flex-col md:flex-row gap-12 items-stretch">
                   <div className="md:w-5/12 flex flex-col gap-8">
                       <div className="bg-[#FCF9F2] p-8 rounded-2xl border-l-4 border-[#D8CCAB] italic text-[#757575] font-serif text-xl leading-relaxed shadow-sm">
                          "Rust, reinheid en regelmaat kreeg ik te horen. Maar ik miste daarbij de handvatten hoe ik dit kon realiseren."
                       </div>
                       <div className="rounded-2xl overflow-hidden flex-grow min-h-[300px]">
                          <ParallaxImage 
                            src="https://images.unsplash.com/photo-1556910103-1c02745a30bf?auto=format&fit=crop&w=800&q=80"
                            alt="Healthy food"
                            className="w-full h-full"
                          />
                       </div>
                   </div>
                   
                   <div className="md:w-7/12 space-y-6 text-[#757575] leading-relaxed text-lg">
                       <SectionTag text="Mijn Verhaal" />
                       <h2 className="font-serif text-3xl text-[#1D1D1B] mb-4">Mijn reis naar balans</h2>
                       <p>
                           In mijn twintiger jaren verergerde mijn klachten en ik snapte maar niet waarom leeftijdsgenoten altijd zoveel meer energie hadden. Na verschillende onderzoeken bij artsen kreeg ik net als veel anderen te horen dat dit er nu eenmaal bij hoort.
                       </p>
                       <p>
                           Ik ben uiteindelijk bij een orthomoleculair therapeut terecht gekomen, waar ik onder begeleiding mijn levensstijl en voedingspatroon omgooide maar vooral ook meer naar mijn lichaam ging luisteren. Enthousiast met mijn resultaten, besloot ik zelf ook mijn diploma tot orthomoleculair therapeut te behalen.
                       </p>
                       <p>
                           Door mijn kennis uit de reguliere zorg en de alternatieve geneeskunde heb ik een brede kijk op de gezondheidszorg en kan ik jou vol passie begeleiden. Ik heb mijn praktijk aan huis. Een praktijk waar ik samen met jou op zoek ga naar de oorzaak van jouw klachten en je begeleid naar een betere gezondheid en leefstijl die passend is voor jou!
                       </p>
                       <div className="pt-6">
                           <Button variant="outline" onClick={() => onNavigate('contact')}>Plan een kennismaking</Button>
                       </div>
                   </div>
               </div>
           </FadeIn>
       </div>
    </Section>

    <Section className="relative overflow-hidden bg-[#FCF9F2]">
        <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] z-0 mix-blend-multiply"></div>
        
        <div className="relative z-10 max-w-6xl mx-auto">
             <FadeIn className="text-center mb-16">
                 <SectionTag text="Achtergrond" />
                 <h2 className="font-serif text-4xl md:text-5xl mb-6 text-[#1D1D1B]">Kennis & Opleidingen</h2>
                 <p className="text-[#757575] max-w-2xl mx-auto">
                     Ik houd mijn kennis actueel door regelmatig scholingen te volgen. Hier een overzicht van mijn achtergrond.
                 </p>
             </FadeIn>

             <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 {[
                     "Verpleegkunde",
                     "Orthomoleculair therapeut Basis",
                     "Orthomoleculair therapeut Gevorderd",
                     "Orthomoleculair Epigenetisch therapeut",
                     "Energetische Morfologische Bloedtest (EMB)",
                     "Bijscholing Fibromyalgie"
                 ].map((item, i) => (
                     <FadeIn key={i} className="bg-white p-6 rounded-xl border border-[#D8CCAB]/30 shadow-sm hover:border-[#9CAAC6]/50 transition-colors group">
                         <div className="flex items-start gap-4">
                             <div className="w-10 h-10 rounded-full bg-[#FCF9F2] border border-[#D8CCAB] flex items-center justify-center text-[#9CAAC6] group-hover:scale-110 transition-transform">
                                 <GraduationCap size={20} />
                             </div>
                             <div>
                                 <h3 className="text-[#1D1D1B] font-medium text-lg leading-snug">{item}</h3>
                                 <p className="text-[#757575] text-sm mt-1">Gecertificeerd</p>
                             </div>
                         </div>
                     </FadeIn>
                 ))}
             </StaggerContainer>
        </div>
    </Section>
  </PageTransition>
);

const MatchCallPage = () => (
  <PageTransition>
    <Section className="min-h-[80vh] flex items-center bg-[#FCF9F2]">
      <div className="flex flex-col md:flex-row items-center gap-16">
        <div className="md:w-1/2">
          <FadeIn>
             <SectionTag text="Gratis Kennismaking" />
             <h1 className="font-serif text-5xl mb-6 text-[#1D1D1B]">Gratis <span className="text-[#1D1D1B] font-bold">match call</span></h1>
             <p className="text-lg text-[#757575] mb-6 leading-relaxed">
               Twijfel jij over welk traject bij jou past of ben je benieuwd wat ik voor jou kunnen betekenen? Plan dan nu je gratis match call in.
             </p>
             <p className="text-[#757575] mb-6 leading-relaxed">
               In dit kennismakingsgesprek leg ik je alles uit over mijn werkwijze en kan ik jou precies uitleggen hoe ik jou zou kunnen begeleiden! Voel je geen match? Geen probleem! Dit gesprek is geheel vrijblijvend.
             </p>
             <p className="text-[#757575] mb-8 leading-relaxed">
               Ben jij benieuwd wat ik voor jou kan betekenen? Plan snel je gratis match call in!
             </p>
             <Button onClick={() => window.open('https://daniquekwakman.clientomgeving.nl/afspraak-maken?t=QqtG5FOC', '_blank')}>
               Plan jouw gratis match call
             </Button>
          </FadeIn>
        </div>
        <div className="md:w-1/2 relative">
          <FadeIn delay={0.2} className="rounded-full overflow-hidden border-8 border-[#9CAAC6]/20 shadow-xl">
             <img src="https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=800&q=80" alt="Danique Kwakman" className="w-full object-cover aspect-square" />
          </FadeIn>
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#9CAAC6] rounded-full -z-10 opacity-30"></div>
          <div className="absolute -bottom-5 -left-5 w-20 h-20 bg-[#D8CCAB] rounded-full -z-10"></div>
        </div>
      </div>
    </Section>
  </PageTransition>
);

const PodcastPage = () => (
  <PageTransition>
    <Section className="bg-[#FCF9F2]">
      <div className="max-w-4xl mx-auto text-center">
        <FadeIn>
          <SectionTag text="Nu te beluisteren" />
          <h1 className="font-serif text-5xl mb-8 text-[#1D1D1B]">De OrthoBalance Podcast</h1>
          <p className="text-lg text-[#757575] mb-12">
            Luister naar inspirerende gesprekken over hormonen, darmgezondheid en mindset. Wekelijks nieuwe afleveringen.
          </p>
        </FadeIn>

        <div className="grid gap-6">
          {[1, 2, 3].map((ep) => (
            <FadeIn key={ep} className="bg-white p-6 rounded-xl border border-[#D8CCAB]/30 shadow-sm flex flex-col md:flex-row items-center gap-6 text-left hover:border-[#9CAAC6]/50 transition-colors">
              <div className="w-24 h-24 bg-[#D8CCAB] rounded-lg flex-shrink-0 overflow-hidden relative">
                 <img src={`https://images.unsplash.com/photo-1478737270239-2f02b77ac6d5?auto=format&fit=crop&w=400&q=80`} alt="Podcast cover" className="w-full h-full object-cover" />
                 <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <Play className="w-8 h-8 text-white fill-current" />
                 </div>
              </div>
              <div className="flex-grow">
                <div className="text-xs text-[#9CAAC6] font-semibold mb-1">Aflevering {ep}</div>
                <h3 className="font-serif text-xl mb-2 text-[#1D1D1B]">Het geheim van een stabiele bloedsuiker</h3>
                <p className="text-sm text-[#757575]">In deze aflevering bespreken we hoe je energiebalans direct gekoppeld is aan wat je eet in de ochtend.</p>
              </div>
              <Button variant="outline" icon={false}>Luister nu</Button>
            </FadeIn>
          ))}
        </div>
      </div>
    </Section>
  </PageTransition>
);

const EbookPage = () => (
  <PageTransition>
    <Section className="bg-[#FCF9F2] min-h-screen flex items-center relative overflow-hidden">
      {/* The Beige Circle Background - positioned behind image */}
      <div className="hidden md:block absolute left-[10%] top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#D8CCAB] rounded-full z-0 opacity-80"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-16 lg:gap-24">

          {/* Left: Image (Tablet Mockup) */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-end">
            <FadeIn className="relative w-full max-w-md">
               {/* Tablet Frame */}
               <div className="bg-[#9CAAC6]/40 p-3 rounded-[2.5rem] shadow-xl backdrop-blur-sm border border-white/20">
                  <div className="bg-[#9CAAC6] p-1 rounded-[2rem]">
                    <div className="bg-white rounded-[1.8rem] overflow-hidden border-[6px] border-slate-800/5 shadow-inner relative aspect-[3/4]">
                        {/* Using the existing unsplash image but styling it to look like a cover */}
                       <img
                         src="https://images.unsplash.com/photo-1494390248081-4e521a5940db?auto=format&fit=crop&w=800&q=80"
                         alt="5 Ontbijt Recepten E-book"
                         className="w-full h-full object-cover"
                       />
                       {/* Overlay text to mimic the specific cover in reference */}
                       <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex flex-col justify-end p-6">
                          <span className="text-white font-serif text-6xl font-bold">5</span>
                          <span className="text-white font-medium text-xl">ontbijt recepten</span>
                          <span className="text-white/80 text-xs mt-2">voor de meest energieke start van je dag</span>
                       </div>
                    </div>
                  </div>
               </div>
            </FadeIn>
          </div>

          {/* Right: Content */}
          <div className="w-full md:w-1/2 text-left">
            <FadeIn delay={0.2}>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-[#1D1D1B] mb-8 leading-[1.1]">
                5 ontbijt recepten voor de <span className="italic">meest energieke</span> start van je dag
              </h1>
              <div className="space-y-6 text-[#757575] text-lg leading-relaxed mb-10 max-w-xl">
                <p>
                  Een gezond en voedzaam ontbijtje is de beste start van de dag. Het geeft ons de brandstof die we nodig hebben om de dag goed te starten en geeft ons de energie die we nodig hebben om de hele dag te kunnen shinen.
                </p>
                <p>
                  Gezonde maaltijden zijn de basis voor een gezonde hormoonbalans, gezonde darmen, een sky high energie niveau, betere sportprestaties, je lekkerder in je vel zitten en je mentaal beter voelen.
                </p>
                <p className="font-medium text-[#1D1D1B]">
                  Download het e-book via onderstaande formulier.
                </p>
              </div>

              {/* Form */}
              <form className="flex flex-col gap-4 max-w-md">
                <div className="flex flex-col md:flex-row gap-4">
                     <Input placeholder="Voornaam" className="bg-white border-[#D8CCAB]/50" />
                     <Input type="email" placeholder="E-mailadres" className="bg-white border-[#D8CCAB]/50" />
                </div>
                <ButtonShadcn className="w-full rounded-full text-base py-6">
                    Download nu gratis
                </ButtonShadcn>
              </form>
            </FadeIn>
          </div>

        </div>
      </div>
    </Section>
  </PageTransition>
);

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message?: string;
  terms: boolean;
}

const ContactPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<ContactFormData>();

  const onSubmit = (data: ContactFormData) => {
    console.log("Form submitted:", data);
    // Handle submission here
  };

  return (
    <PageTransition>
      <Section className="bg-[#FCF9F2] min-h-screen py-20 md:py-32">
        <div className="w-full max-w-[600px] mx-auto px-4">
          <div className="text-center mb-12">
              <FadeIn>
                <SectionTag text="Contact" />
                <h1 className="font-serif text-5xl md:text-6xl font-black text-[#1D1D1B] mb-6 tracking-tight">
                  Neem contact op met mij
                </h1>
                <p className="text-[#757575] text-lg font-light">
                  Vul hieronder je gegevens in en ik neem z.s.m contact met je op!
                </p>
              </FadeIn>
          </div>

          <FadeIn className="bg-transparent w-full">
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <div className="space-y-1.5">
                    <Label htmlFor="name">Naam*</Label>
                    <Input 
                      id="name" 
                      placeholder="Jouw naam" 
                      {...register("name", { required: true })} 
                    />
                    {errors.name && <span className="text-red-400 text-xs pl-1">Dit veld is verplicht</span>}
                </div>
                
                <div className="space-y-1.5">
                    <Label htmlFor="email">Email*</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="Jouw email adress" 
                      {...register("email", { required: true })}
                    />
                    {errors.email && <span className="text-red-400 text-xs pl-1">Dit veld is verplicht</span>}
                </div>

                <div className="space-y-1.5">
                    <Label htmlFor="phone">Telefoonnummer (optioneel)</Label>
                    <Input 
                      id="phone" 
                      type="tel" 
                      placeholder="06 -" 
                      {...register("phone")}
                    />
                </div>

                <div className="space-y-1.5">
                    <Label htmlFor="message">Vraag of berichtje</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Hoe kan ik jou helpen?" 
                      {...register("message")}
                    />
                </div>

                <div className="flex items-center gap-3 pl-1 pt-2">
                    <Checkbox id="terms" {...register("terms", { required: true })} />
                    <label htmlFor="terms" className="text-sm text-[#757575] cursor-pointer select-none">
                      Ik accepteer de voorwaarden
                    </label>
                </div>
                {errors.terms && <span className="text-red-400 text-xs pl-1 -mt-2">Je moet de voorwaarden accepteren</span>}

                <div className="pt-4">
                  <ButtonShadcn type="submit">
                    Verzenden
                  </ButtonShadcn>
                </div>
              </form>
          </FadeIn>
        </div>
      </Section>
    </PageTransition>
  );
};

const HomePage = ({ onNavigate }: { onNavigate: (page: string) => void }) => (
  <PageTransition>
    {/* Hero */}
    <Section className="min-h-screen flex items-center justify-center relative overflow-hidden">
       {/* Background Image with Overlay */}
       <div className="absolute inset-0 z-0">
          <ParallaxImage src="https://images.unsplash.com/photo-1504221502049-8504d5444073?auto=format&fit=crop&w=1600&q=80" alt="Hero Background" className="w-full h-full object-cover" />
          {/* Optional subtle overlay for text readability if sky is too bright */}
          <div className="absolute inset-0 bg-black/10"></div>
       </div>
       
       <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <FadeIn>
            <SectionTag text="Orthomoleculaire Therapie" />
            <h1 className="font-serif text-5xl md:text-7xl text-white mb-6 leading-tight">
              Herstel je balans, <br/> <span className="italic text-[#D8CCAB]">hervind je energie</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
              Ik help vrouwen om de oorzaak van hun klachten te vinden en weer te stralen van binnenuit. Geen symptoombestrijding, maar een duurzame oplossing.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <Button onClick={() => onNavigate('contact')}>
                Gratis kennismaking
              </Button>
              <Button variant="white" onClick={() => onNavigate('about')} icon={false}>
                Lees mijn verhaal
              </Button>
            </div>
          </FadeIn>
       </div>
    </Section>

    {/* Services Preview */}
    <Section id="services" className="bg-white">
       <div className="text-center mb-16">
         <FadeIn>
           <SectionTag text="Expertise" />
           <h2 className="font-serif text-4xl md:text-5xl text-[#1D1D1B] mb-4">Mijn Expertise</h2>
           <p className="text-[#757575]">Waar ik je mee kan helpen</p>
         </FadeIn>
       </div>
       <ServiceAccordion />
    </Section>
    
    {/* Treatments */}
    <TreatmentsSection onNavigate={onNavigate} />

    {/* Steps */}
    <StepsSection />

    {/* Testimonials */}
    <Section className="bg-white">
      <div className="text-center mb-16">
        <FadeIn>
           <SectionTag text="Reviews" />
           <h2 className="font-serif text-4xl md:text-5xl text-[#1D1D1B] mb-4">Ervaringen</h2>
        </FadeIn>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {TESTIMONIALS.map((t, i) => (
           <FadeIn key={t.id} delay={i * 0.1} className="bg-[#FCF9F2] p-8 rounded-2xl border border-[#D8CCAB]/20">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} className="fill-[#D8CCAB] text-[#D8CCAB]" />)}
              </div>
              <p className="text-[#757575] italic mb-6 leading-relaxed">"{t.text}"</p>
              <div className="flex items-center gap-4">
                <img src={t.image} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                <span className="font-medium text-[#1D1D1B]">{t.name}</span>
              </div>
           </FadeIn>
        ))}
      </div>
    </Section>

    {/* FAQ */}
    <Section>
       <div className="text-center mb-16">
         <FadeIn>
           <SectionTag text="FAQ" />
           <h2 className="font-serif text-4xl md:text-5xl text-[#1D1D1B] mb-4">Veelgestelde vragen</h2>
         </FadeIn>
       </div>
       <FaqAccordion />
    </Section>
  </PageTransition>
);

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch(currentPage) {
      case 'home': return <HomePage onNavigate={setCurrentPage} />;
      case 'about': return <AboutPage onNavigate={setCurrentPage} />;
      case 'glowup': return <GlowUpPage onNavigate={setCurrentPage} />;
      case 'darmtraject': return <DarmTrajectPage onNavigate={setCurrentPage} />;
      case 'match-call': return <MatchCallPage />;
      case 'podcast': return <PodcastPage />;
      case 'ebook': return <EbookPage />;
      case 'contact': return <ContactPage />;
      default: return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <Layout currentPage={currentPage} onNavigate={setCurrentPage}>
       <AnimatePresence mode="wait">
         {renderPage()}
       </AnimatePresence>
    </Layout>
  );
};

export default App;
