'use client';

import BarBtn from '@/components/shared/btn/BarBtn';
import CategoryBtn from '@/components/shared/btn/CategoryBtn';
import { getEmployees, getLikedEmployees } from '@/service/employer';
import { Employee } from '@/types/employer';
import { useEffect, useState } from 'react';
import EmployeeCard from './EmployeeCard';
import InterviewResultModal from './InterviewResultModal';
import { useSearchParams } from 'next/navigation';

type Props = {
  employees: Employee[];
  intervieweeId:number;
};

type BigCategory = 'interview' | 'liked';
type InterviewCategory = 'ongoing' | 'done';

export default function MeEmployerContainer({ employees, intervieweeId }: Props) {
  const [selectedBigCategory, setSelectedBigCategory] =
    useState<BigCategory>('interview');
  const [selectedInterviewCategory, setSelectedInterviewCategory] =
    useState<InterviewCategory>('ongoing');
  const [currentEmployees, setCurrentEmployees] =
    useState<Employee[]>(employees);

  const [isOpen, setIsOpen] = useState<boolean>(!!intervieweeId);
  const [selectedUserId, setSelectedUserId] = useState<number>(intervieweeId);

  const handleClick = async (type: BigCategory) => {
    let employees;
    switch (type) {
      case 'interview':
        employees = await getEmployees(false);
        setCurrentEmployees(employees);
        setSelectedInterviewCategory('ongoing');
        break;
      case 'liked':
        employees = await getLikedEmployees();
        setCurrentEmployees(employees);
        break;
      default:
        throw new Error('잘못된 카테고리 이름임');
    }
    setSelectedBigCategory(type);
  };

  const handleInterviewCategoryClick = async (type: InterviewCategory) => {
    let employees;
    switch (type) {
      case 'ongoing':
        employees = await getEmployees(false);
        setCurrentEmployees(employees);
        break;
      case 'done':
        employees = await getEmployees(true);
        setCurrentEmployees(employees);
        break;
      default:
        throw new Error('잘못된 카테고리 이름임');
    }
    setSelectedInterviewCategory(type);
  };

  const handleClickResult = (userId: number) => {
    setSelectedUserId(userId);
    setIsOpen(true);
  };

  useEffect(() => {
    if (!intervieweeId) return;
    handleInterviewCategoryClick('done');
  }, [])

  return (
    <div>
      <div className="flex w-full justify-around my-4">
        <BarBtn
          text="면접 요청한 유저"
          onClick={() => handleClick('interview')}
          isSelected={selectedBigCategory === 'interview'}
        />
        <BarBtn
          text="좋아요한 유저"
          onClick={() => handleClick('liked')}
          isSelected={selectedBigCategory === 'liked'}
        />
      </div>
      {selectedBigCategory === 'interview' && (
        <div className="flex gap-2 my-4">
          <CategoryBtn
            text="진행 중"
            onClick={() => handleInterviewCategoryClick('ongoing')}
            isSelected={selectedInterviewCategory === 'ongoing'}
          />
          <CategoryBtn
            text="종료"
            onClick={() => handleInterviewCategoryClick('done')}
            isSelected={selectedInterviewCategory === 'done'}
          />
        </div>
      )}

      <section className="w-full">
        <ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {currentEmployees.map((employee) => {
            return (
              <li key={employee.userId}>
                {selectedBigCategory === 'liked' && (
                  <EmployeeCard employee={employee} type="liked" />
                )}
                {selectedBigCategory !== 'liked' &&
                  selectedInterviewCategory === 'done' && (
                    <EmployeeCard
                      employee={employee}
                      type="done"
                      onClickResult={handleClickResult}
                    />
                  )}
                {selectedBigCategory !== 'liked' &&
                  selectedInterviewCategory === 'ongoing' && (
                    <EmployeeCard employee={employee} type="ongoing" />
                  )}
              </li>
            );
          })}
        </ul>
        {isOpen && (
          <InterviewResultModal
            onClose={() => setIsOpen(false)}
            userId={selectedUserId}
          />
        )}
      </section>
    </div>
  );
}
