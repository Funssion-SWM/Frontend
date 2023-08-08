'use client'
import HistoryBox from './HistoryBox';
import Calendar from 'react-calendar';
import { useState } from 'react';
import { getHistory } from '@/service/me';
import { Record } from '@/types';
import '../../styles/calendar/Calendar.css';

type View = 'century' | 'decade' | 'year' | 'month';
type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];


type Props = {
  history: Record[],
  userId: number
}

type Params = {
  date: Date,
  view: String
};

export default function History({ history, userId }:Props) {
  const [value, onChange] = useState<Value>(new Date());
  const [month, setMonth] = useState<number | undefined>((new Date()).getMonth());
  const [monthlyHistories, setHistories] = useState<Record[]>(history);
  const [curView, setView] = useState<View>("month");
  const [curActiveStartDate, setActiveStartDate] = useState<Date>(new Date());

  const shortMonthName:string[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  let index = 0;

  function formatMonth(date:Date) {
    return shortMonthName[date.getMonth()-1 >= 0 ? date.getMonth()-1 : 11];
  }

  function getItem(date:Date) {

    // if (date.getDate() === 1) index = 0;

    let item:Record = {
      historyId: 0,
      date: `${date.getFullYear()}-${Math.floor(date.getMonth()/10)}${date.getMonth()%10}-${Math.floor(date.getDate()/10)}${date.getDate()%10}`,
      postCnt: 0
    };

    if (monthlyHistories.length > index && monthlyHistories[index].date === item.date) { 
      item = monthlyHistories[index];
      index += 1;
    }

    return item;
  }

  function tileContent({ date, view }:Params) {

    if (view === 'month' && month != undefined && date.getMonth() == month) {

      let item = getItem(date);

      return (<HistoryBox key={date.toDateString()} item={item} />);
    }

    if (view == 'year') {
      return shortMonthName[date.getMonth()];
    }
  }

  return (
    <section className="self-start w-full mt-5">
      <Calendar 
        calendarType="gregory" 
        locale="en"

        onActiveStartDateChange={async ({ activeStartDate, view }) => {
          activeStartDate = activeStartDate ? activeStartDate : new Date()
          const curHistories = await getHistory(userId, activeStartDate?.getFullYear(), activeStartDate?.getMonth());
          setHistories(() => {
            console.log(curHistories);
            return curHistories;}
            );

          if (view === 'month' || view === 'year') {
            setActiveStartDate(activeStartDate ? activeStartDate : new Date());

          }
          setMonth(activeStartDate?.getMonth());
        }}
        onDrillUp={({ view }) => {view === 'decade' ? setView('year') : setView(view)}}
        onDrillDown={({ view }) => setView(view)}
        onChange={onChange}

        formatDay={() => ''}
        formatShortWeekday={() => ''}
        formatMonth={() => ''}
        formatMonthYear={(locale, date) => formatMonth(date)}

        tileContent={tileContent}
        activeStartDate={curActiveStartDate}
        view={curView}
        value={value}
      />
    </section>
  );
}
