* If you attempt to add data twice with the same format, the new data will replace the old data, but in the same position within the list of types as the old data.

* The type argument to the clearData() method is optional. If the type is not specified, the data associated with all types is removed. If the drag contains no drag data items, or all of the items have been subsequently cleared, then no drag will occur.

* During a drag operation, a listener for the dragenter or dragover events can check the effectAllowed property to see which operations are permitted. A related property, dropEffect, should be set within one of these events to specify which single operation should be performed. Valid values for dropEffect are none, copy, move, or link. The combination values are not used for this property.

* You can modify the dropEffect property during the dragenter or dragover events, if for example, a particular drop target only supports certain operations. You can modify the dropEffect property to override the user effect, and enforce a specific drop operation to occur. Note that this effect must be one listed within the effectAllowed property. Otherwise, it will be set to an alternate value that is allowed.

* Within the drop and dragend events, you can check the dropEffect property to determine which effect was ultimately chosen.  If the chosen effect were "move", then the original data should be removed from the source of the drag within the dragend event.


vue模版的执行顺序及速度的怪异？
