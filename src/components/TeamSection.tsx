
import React from 'react';
import TeamMemberCard from "./TeamMemberCard";
import { useLanguage } from '@/contexts/LanguageContext';

interface TeamMember {
  key: string;
  name: string;
  role: string;
  bio: string;
  expertise: string[];
  linkedin: string;
  email: string;
  image?: string;
}

interface TeamSectionProps {
  founders: TeamMember[];
}

const TeamSection: React.FC<TeamSectionProps> = ({ founders }) => {
  const { t } = useLanguage();
  
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-telegraf font-bold text-4xl text-primary mb-6">
            {t('about.team.title')}
          </h2>
          <p className="font-telegraf text-xl text-gray-600 max-w-3xl mx-auto">
            {t('about.team.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {founders.map((founder, index) => (
            <TeamMemberCard
              key={index}
              founder={founder}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
