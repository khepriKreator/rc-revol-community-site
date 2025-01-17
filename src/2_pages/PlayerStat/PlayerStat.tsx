import {keepPreviousData, useQuery} from '@tanstack/react-query';
import { useParams, Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import Table from 'react-bootstrap/Table';
import { format } from 'date-fns';
import { useState } from 'react';
import {
  TrackRatingsService,
  AccountService,
} from '../../6_shared/api/generated/game';
import {CustomPagination} from "../../6_shared/components/CustomPagination";
import { Cell, Text } from '../../6_shared';
import styles from './styles.module.css';
const Q_KEY1 = 'accountControllerFindOne';
const Q_KEY2 = 'statsControllerGetAccountLeaderBoard';
export const PlayerStat = () => {
  const { accountId } = useParams();
  const { data: user } = useQuery({
    queryKey: [Q_KEY1, accountId],
    queryFn: () => AccountService.accountControllerFindOne(Number(accountId)),
  });
  const [page, setPage] = useState(1);
  const { data, isLoading } = useQuery({
    queryKey: [Q_KEY2, accountId, page],
    queryFn: () =>
      TrackRatingsService.statsControllerGetAccountLeaderBoard(
        Number(accountId),
        page,
        10,
        false,
      ),
    placeholderData: keepPreviousData,
  });
  if (!data) {
    return null;
  }
  if (!user) {
    return null;
  }
  const { items: tracks } = data;

  return (
    <div className={styles.display}>
      <Cell
        primaryText={
          <Text size={'XL'} weight={'bold'}>
            {user?.username}
          </Text>
        }
        image={user.avatar}
        secondaryText={null}
      />
      <Table borderless striped>
        <thead>
          <tr>
            <th>Track</th>
            <th>Position</th>
            <th>Best Lap Time</th>
            <th>Time</th>
            <th>Date</th>
            <th>Number of Tries</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <PlayerStatSkeleton />
          ) : (
            tracks.map((track, index) => {
              const date = Date.parse(track.createdAt);
              const bestLapTime = track.bestLapTime
                ? format(track.bestLapTime * 1000, 'm:ss:SSS')
                : '-';
              const time = track.time
                ? format(track.time * 1000, 'm:ss:SSS')
                : '-';
              return (
                <tr key={index}>
                  <td>
                    <Cell
                      primaryText={
                        <Link to={`/tracks/${track.trackPublicId}`}>
                          <Text isLink={true} size={'S'}>
                            {track.trackPublicId}
                          </Text>
                        </Link>
                      }
                      image={null}
                      secondaryText={null}
                    />
                  </td>
                  <td>{track.position}</td>
                  <td>{bestLapTime}</td>
                  <td>{time}</td>
                  <td>{format(date, 'yyyy-MM-dd HH:mm')}</td>
                  <td>{track.number}</td>
                </tr>
              );
            })
          )}
        </tbody>
      </Table>
      {
          data.meta.totalPages > 1 && <CustomPagination
              setDataPage={(currentPage) => setPage(currentPage)}
              totalPages={data?.meta.totalPages || 0}
          />
      }
    </div>
  );
};

export const PlayerStatSkeleton = () => {
  return (
    <>
      {Array(10)
        .fill(null)
        .map((_, index) => (
          <tr key={index}>
            {/*<td>
                        <div className={styles.skeletonFirst}>
                            <Skeleton height={'40px'} width={'40px'}/>
                            <div className={'w-100 align-middle'}>
                                <Skeleton height={16}/>
                            </div>
                        </div>
                    </td>*/}
            <td>
              <Skeleton height={16} />
            </td>
            <td>
              <Skeleton height={16} />
            </td>
            <td>
              <Skeleton height={16} />
            </td>
            <td>
              <Skeleton height={16} />
            </td>
            <td>
              <Skeleton height={16} />
            </td>
            <td>
              <Skeleton height={16} />
            </td>
          </tr>
        ))}
    </>
  );
};
