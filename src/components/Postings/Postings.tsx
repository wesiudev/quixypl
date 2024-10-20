import moment from "moment";
import { useSelector } from "react-redux";

interface IProjectImage {
  src: string;
  desc: string;
}

export interface IProject {
  name: string;
  desc: string;
  images: IProjectImage[];
  url: string;
  time: string;
  isRecruitment: boolean;
  price: any;
  isPaid: boolean;
  days: number;
  type: "quick" | "normal";
  id: string;
  expirationTime: number;
  companySize: string;
  creationTime: number;
  extraDays: number;
  link: string;
}

const getExpirationColor = (expirationTime: number, extraDays: number) => {
  const expirationDate = moment(expirationTime).add(extraDays, "days");
  return expirationDate.isBefore(moment()) ? "red" : "green"; // Example logic for expiration color
};

const JobOfferList = ({ jobOffers }: { jobOffers: IProject[] }) => {
  const { user } = useSelector((state: any) => state.user);
  return (
    <div>
      {jobOffers?.map((jobOffer: IProject, i: number) => (
        <div key={i} className="text-left">
          <div className="text-black block p-3 border-b border-gray-300 hover:bg-gray-300">
            <h3 className="text-lg font-bold">{jobOffer.name}</h3>
            <p className="text-sm text-gray-500">{jobOffer.desc}</p>
            <div className="flex flex-col font-gotham mt-1">
              <h2>Dzień dodania</h2>
              <div className="flex items-center">
                <span>
                  {moment(jobOffer.creationTime).format("DD.MM.YYYY hh:mm:ss")}
                </span>
              </div>
              <h2 className="mt-2">Dzień wygaśnięcia</h2>
              <div className="flex items-center">
                {jobOffer?.expirationTime && (
                  <span
                    style={{
                      color: getExpirationColor(
                        jobOffer.expirationTime,
                        jobOffer.extraDays || 0
                      ),
                    }}
                  >
                    {moment(jobOffer.creationTime)
                      .add(jobOffer.days, "days")
                      .add(jobOffer.extraDays || 0, "days")
                      .format("DD.MM.YYYY hh:mm:ss")}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default JobOfferList;
