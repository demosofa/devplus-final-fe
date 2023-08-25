import { useQueryClient } from '@tanstack/react-query';
import { Statistic } from 'antd';
import { memo } from 'react';

import { CAMPAIGN } from '@enums';
import { CampaignType } from '@types';

const { Countdown } = Statistic;

function CountdownTimer({
	queryKey,
	campaign,
}: {
	queryKey: string;
	campaign: CampaignType;
}) {
	const queryClient = useQueryClient();

	if (campaign.status == CAMPAIGN.INACTIVE) return <label>Expired</label>;

	return (
		<Countdown
			value={campaign.expired_time}
			format="DD : HH : mm : ss"
			onFinish={() => {
				queryClient.setQueryData<CampaignType[]>([queryKey], (oldData) => {
					const cloned = oldData!.concat();

					const idx = cloned.findIndex((item) => item.id === campaign.id);

					cloned[idx].status = CAMPAIGN.INACTIVE;

					return cloned;
				});
			}}
		/>
	);
}

export const CampaignCountdown = memo(CountdownTimer);
