import { Component, AfterViewInit, OnDestroy, Input, OnInit } from '@angular/core';
import { jsPlumb } from 'jsplumb';
import { identifierModuleUrl } from '@angular/compiler';

@Component({
    selector: 'final-match',
    templateUrl: './final-match.component.html',
    styleUrls: ['./final-match.component.less']
})
export class FinalMatchComponent implements OnInit, AfterViewInit, OnDestroy {

    private jsPlumbInstance;
    private anchor;
    @Input() id: string;
    @Input() side: string = 'right';

    ngOnInit() {
        if (this.side === 'left') {
            this.anchor = ['Left', 'Right'];
        } else {
            this.anchor = ['Right', 'Left'];
        }
    }

    ngAfterViewInit() {
        this.jsPlumbInstance = jsPlumb.getInstance();
        this.drawConnections();
    }

    ngOnDestroy() {
        this.jsPlumbInstance.reset();
    }
    

    drawConnections() {
        let labelName = 'connection';
        this.jsPlumbInstance.connect({
        connector: ['Flowchart', { stub: [112, 67], cornerRadius: 1, alwaysRespectStubs: true }],
        source: `Source-${this.id}`,
        target: `Target-${this.id}`,
        anchor: this.anchor,
        paintStyle: { stroke: '#456', strokeWidth: 4 },
        // overlays: [
        //   ['Label', { label: labelName, location: 0.5, cssClass: 'connectingConnectorLabel' }]
        // ],
        });
    }

}