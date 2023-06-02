import { IScope } from "database/types";
import { serialize } from "libs/utils/data";
import { Posts } from "../../../database/models/social/Posts";
import Comments from "./Comments";
import { StartDiscussion } from "./StartDiscussion";

interface Props {
  scope: IScope;
}

export const Discussion = async (props: Props) => {
  const { scope } = props;

  const comments = await Posts().getForScope(scope.id);

  return (
    <div className="space-y-6">
      <Comments comments={serialize(comments)} />
      <StartDiscussion scope={scope} />
    </div>
  );
};

export default Discussion;
